"use client"

import { useEffect } from "react"

export default function ChatScripts() {
  useEffect(() => {
    // Load the first script
    const injectScript = document.createElement("script")
    injectScript.src = "https://cdn.botpress.cloud/webchat/v2.3/inject.js"
    injectScript.async = true
    document.body.appendChild(injectScript)

    // Load the second script after the first one is loaded
    injectScript.onload = () => {
      const configScript = document.createElement("script")
      configScript.src = "https://files.bpcontent.cloud/2025/04/08/01/20250408013017-0XFHDES7.js"
      configScript.async = true
      document.body.appendChild(configScript)
    }

    return () => {
      // Clean up scripts when component unmounts
      document.body.removeChild(injectScript)
    }
  }, [])

  return null
}
