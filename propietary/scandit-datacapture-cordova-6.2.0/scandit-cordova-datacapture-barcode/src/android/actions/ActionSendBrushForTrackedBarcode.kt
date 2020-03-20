/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2019- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.barcode.actions

import com.scandit.datacapture.cordova.core.actions.Action
import com.scandit.datacapture.cordova.core.data.SerializableCallbackAction
import org.apache.cordova.CallbackContext
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

class ActionSendBrushForTrackedBarcode(
        private val listener: ResultListener
): Action {

    override fun run(args: JSONArray, callbackContext: CallbackContext): Boolean {
        try {
            val message = SerializableCallbackAction(
                    ACTION_NAME,
                    args.getJSONObject(0),
                    finishCallbackId = ACTION_NAME,
                    shouldNotifyWhenFinished = true
            ).toJson()
            listener.onSendBrushForTrackedBarcodeActionExecuted(message, callbackContext)
        } catch (e: JSONException) {
            e.printStackTrace()
            listener.onJsonParseError(e, callbackContext)
        }
        return true
    }

    companion object {
        const val ACTION_NAME = "brushForTrackedBarcode"
    }

    interface ResultListener {
        fun onSendBrushForTrackedBarcodeActionExecuted(
                message: JSONObject, callbackContext: CallbackContext
        )
        fun onJsonParseError(error: Throwable, callbackContext: CallbackContext)
    }
}
