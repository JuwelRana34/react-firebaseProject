import { useState, useEffect } from 'react';

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Listen for the `beforeinstallprompt` event
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      // Store the event for triggering it later
      setDeferredPrompt(event);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the prompt to the user
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the saved prompt
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  return (
    <>
      {isInstallable && (
        <button onClick={handleInstallClick} className="install-button">
          Install App
        </button>
      )}
    </>
  );
};

export default InstallPWAButton;
