/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2019- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.barcode.actions

import com.scandit.datacapture.cordova.core.actions.Action
import org.apache.cordova.CallbackContext
import org.json.JSONArray

class ActionClearTrackedBarcodeBrushes(
        private val listener: ResultListener
) : Action {

    override fun run(args: JSONArray, callbackContext: CallbackContext): Boolean {
        listener.onActionClearTrackedBarcodeBrushesExecuted(callbackContext)
        return true
    }

    interface ResultListener {
        fun onActionClearTrackedBarcodeBrushesExecuted(callbackContext: CallbackContext)
    }
}
