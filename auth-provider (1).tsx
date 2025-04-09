"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  updateProfile,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth"
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore"

// Firebase configuration - replace with your own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDZQwbBMEVR9Qxb-zLxjLPCQvhPeTXwYh0",
  authDomain: "kick-score-app.firebaseapp.com",
  projectId: "kick-score-app",
  storageBucket: "kick-score-app.appspot.com",
  messagingSenderId: "1098765432",
  appId: "1:1098765432:web:abcdef1234567890",
}

// Initialize Firebase
let app
let auth
let db

try {
  // Initialize Firebase only on client side
  if (typeof window !== "undefined") {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    console.log("Firebase initialized successfully")
  }
} catch (error) {
  console.error("Error initializing Firebase:", error)
}

// Auth providers
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()
const appleProvider = new OAuthProvider("apple.com")

// Configure providers
googleProvider.setCustomParameters({
  prompt: "select_account",
})

facebookProvider.setCustomParameters({
  display: "popup",
})

type User = {
  id: string
  name: string
  email: string
  photoURL?: string
  bio?: string
  preferences?: {
    leagues: string[]
  }
  notificationSettings?: {
    matchAlerts: boolean
    goalAlerts: boolean
    teamNews: boolean
    transferNews: boolean
  }
  displaySettings?: {
    darkMode: boolean
    compactView: boolean
    showScores: boolean
    language: string
  }
} | null

type AuthContextType = {
  user: User
  loginWithEmail: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  loginWithFacebook: () => Promise<void>
  loginWithApple: () => Promise<void>
  register: (name: string, email: string, password: string, photoURL?: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
  updatePreferences: (preferences: any) => Promise<void>
  updateUser: (userData: Partial<User>) => Promise<void>
  authError: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loginWithEmail: async () => {},
  loginWithGoogle: async () => {},
  loginWithFacebook: async () => {},
  loginWithApple: async () => {},
  register: async () => {},
  logout: async () => {},
  loading: true,
  updatePreferences: async () => {},
  updateUser: async () => {},
  authError: null,
})

// Mock user for development
const MOCK_USER = {
  id: "mock-user-1",
  name: "Test User",
  email: "test@example.com",
  photoURL: "https://media.api-sports.io/football/players/276.png",
  bio: "Football enthusiast and Liverpool fan.",
  preferences: {
    leagues: ["39", "140", "78"],
  },
  notificationSettings: {
    matchAlerts: true,
    goalAlerts: true,
    teamNews: true,
    transferNews: false,
  },
  displaySettings: {
    darkMode: true,
    compactView: false,
    showScores: true,
    language: "en",
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  // Load user from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined" && !initialized) {
      const storedUser = localStorage.getItem("kickScoreUser")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (e) {
          console.error("Error parsing stored user:", e)
        }
      }
      setInitialized(true)
    }
  }, [initialized])

  // Convert Firebase user to our User type
  const createUserProfile = async (firebaseUser: FirebaseUser) => {
    try {
      const { uid, displayName, email, photoURL } = firebaseUser

      // Check if user document exists
      const userRef = doc(db, "users", uid)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        // User exists, return user data
        const userData = userSnap.data()
        return {
          id: uid,
          name: displayName || userData.name,
          email: email || userData.email,
          photoURL: photoURL || userData.photoURL,
          bio: userData.bio || "",
          preferences: userData.preferences || { leagues: [] },
          notificationSettings: userData.notificationSettings || {
            matchAlerts: true,
            goalAlerts: true,
            teamNews: true,
            transferNews: false,
          },
          displaySettings: userData.displaySettings || {
            darkMode: true,
            compactView: false,
            showScores: true,
            language: "en",
          },
        }
      } else {
        // New user, create profile
        const newUser = {
          id: uid,
          name: displayName || email?.split("@")[0] || "User",
          email: email || "",
          photoURL: photoURL || "",
          bio: "",
          preferences: { leagues: [] },
          notificationSettings: {
            matchAlerts: true,
            goalAlerts: true,
            teamNews: true,
            transferNews: false,
          },
          displaySettings: {
            darkMode: true,
            compactView: false,
            showScores: true,
            language: "en",
          },
        }

        // Save to Firestore
        await setDoc(userRef, newUser)
        return newUser
      }
    } catch (error) {
      console.error("Error creating user profile:", error)

      // Fallback to a basic user object if Firestore fails
      return {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
        email: firebaseUser.email || "",
        photoURL: firebaseUser.photoURL || "",
        preferences: { leagues: [] },
      }
    }
  }

  // Initialize auth state
  useEffect(() => {
    if (!auth) {
      console.log("Using mock user for development")
      setUser(MOCK_USER)
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true)
      try {
        if (firebaseUser) {
          // User is signed in
          console.log("User is signed in:", firebaseUser.uid)
          const userProfile = await createUserProfile(firebaseUser)
          setUser(userProfile)

          // Store user in localStorage for persistence
          localStorage.setItem("kickScoreUser", JSON.stringify(userProfile))
        } else {
          // User is signed out
          console.log("User is signed out")
          setUser(null)
          localStorage.removeItem("kickScoreUser")
        }
      } catch (error) {
        console.error("Error in auth state change:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true)
    setAuthError(null)

    try {
      console.log("Attempting email login for:", email)

      if (!auth) {
        console.log("Using mock user for development")
        setUser(MOCK_USER)
        localStorage.setItem("kickScoreUser", JSON.stringify(MOCK_USER))
        return
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const userProfile = await createUserProfile(userCredential.user)
      setUser(userProfile)
      localStorage.setItem("kickScoreUser", JSON.stringify(userProfile))
    } catch (error: any) {
      console.error("Email login failed:", error.message)
      setAuthError(error.message || "Failed to login with email and password")

      // For development, use mock user
      if (process.env.NODE_ENV === "development") {
        console.log("Using mock user for development")
        setUser(MOCK_USER)
        localStorage.setItem("kickScoreUser", JSON.stringify(MOCK_USER))
      } else {
        throw error
      }
    } finally {
      setLoading(false)
    }
  }

  const loginWithSocial = async (provider: any, providerName: string) => {
    setLoading(true)
    setAuthError(null)

    try {
      console.log(`Attempting ${providerName} login`)

      if (!auth) {
        console.log("Using mock user for development")
        setUser(MOCK_USER)
        localStorage.setItem("kickScoreUser", JSON.stringify(MOCK_USER))
        return
      }

      const result = await signInWithPopup(auth, provider)
      const userProfile = await createUserProfile(result.user)
      setUser(userProfile)
      localStorage.setItem("kickScoreUser", JSON.stringify(userProfile))
    } catch (error: any) {
      console.error(`${providerName} login failed:`, error.message)
      setAuthError(error.message || `Failed to login with ${providerName}`)

      // For development, use mock user
      if (process.env.NODE_ENV === "development") {
        console.log("Using mock user for development")
        setUser(MOCK_USER)
        localStorage.setItem("kickScoreUser", JSON.stringify(MOCK_USER))
      } else {
        throw error
      }
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = () => loginWithSocial(googleProvider, "Google")
  const loginWithFacebook = () => loginWithSocial(facebookProvider, "Facebook")
  const loginWithApple = () => loginWithSocial(appleProvider, "Apple")

  const register = async (name: string, email: string, password: string, photoURL?: string) => {
    setLoading(true)
    setAuthError(null)

    try {
      console.log("Attempting to register:", email)

      if (!auth) {
        console.log("Using mock user for development")
        setUser(MOCK_USER)
        localStorage.setItem("kickScoreUser", JSON.stringify(MOCK_USER))
        return
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Update profile with name and photo
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || "",
      })

      // Create user profile in Firestore
      const userProfile = await createUserProfile(userCredential.user)
      setUser(userProfile)
      localStorage.setItem("kickScoreUser", JSON.stringify(userProfile))
    } catch (error: any) {
      console.error("Registration failed:", error.message)
      setAuthError(error.message || "Failed to register")

      // For development, use mock user
      if (process.env.NODE_ENV === "development") {
        console.log("Using mock user for development")
        setUser(MOCK_USER)
        localStorage.setItem("kickScoreUser", JSON.stringify(MOCK_USER))
      } else {
        throw error
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      console.log("Logging out")

      if (!auth) {
        setUser(null)
        localStorage.removeItem("kickScoreUser")
        return
      }

      await signOut(auth)
      setUser(null)
      localStorage.removeItem("kickScoreUser")
    } catch (error: any) {
      console.error("Logout failed:", error.message)
      setAuthError(error.message || "Failed to logout")
    }
  }

  const updatePreferences = async (preferences: any) => {
    if (!user) return

    setLoading(true)
    try {
      console.log("Updating preferences:", preferences)

      if (db) {
        try {
          // Try to update Firestore
          const userRef = doc(db, "users", user.id)
          await updateDoc(userRef, {
            preferences: preferences,
          })
        } catch (error) {
          console.error("Firestore update failed, continuing with local update:", error)
        }
      }

      // Update local state regardless of Firestore success
      const updatedUser = {
        ...user,
        preferences: {
          ...user.preferences,
          ...preferences,
        },
      }

      setUser(updatedUser)

      // Also update localStorage for persistence
      localStorage.setItem("kickScoreUser", JSON.stringify(updatedUser))
    } catch (error: any) {
      console.error("Update preferences failed:", error.message)
      setAuthError(error.message || "Failed to update preferences")
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return

    setLoading(true)
    try {
      console.log("Updating user data:", userData)

      if (db) {
        try {
          // Try to update Firestore
          const userRef = doc(db, "users", user.id)
          await updateDoc(userRef, userData)
        } catch (error) {
          console.error("Firestore update failed, continuing with local update:", error)
        }
      }

      // Update local state regardless of Firestore success
      const updatedUser = {
        ...user,
        ...userData,
      }

      setUser(updatedUser)

      // Also update localStorage for persistence
      localStorage.setItem("kickScoreUser", JSON.stringify(updatedUser))
    } catch (error: any) {
      console.error("Update user failed:", error.message)
      setAuthError(error.message || "Failed to update user data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithEmail,
        loginWithGoogle,
        loginWithFacebook,
        loginWithApple,
        register,
        logout,
        loading,
        updatePreferences,
        updateUser,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
