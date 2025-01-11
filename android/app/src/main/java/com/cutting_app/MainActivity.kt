package com.cutting_app

import android.content.Intent // Import required for Intent
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    override fun getMainComponentName(): String = "cutting_app"

    /**
     * Returns the instance of the [ReactActivityDelegate].
     * We use [DefaultReactActivityDelegate] which allows you to enable
     * New Architecture with a single boolean flag [fabricEnabled].
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    /**
     * Override the onPause() method to bring back the KioskActivity.
     */
    override fun onPause() {
        super.onPause()

        // Create an intent to bring the activity to the front
        val intent = Intent(this, MainActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_BROUGHT_TO_FRONT

        // Start the activity again
        startActivity(intent)
    }
}
