package com.rntest;

import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import anddroid.util.TypedValue;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule rendering of the component.
     */
    // @Override
    // protected String getMainComponentName() {
    // return "rntest";
    // }

    @Override
    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);

        TextView textView = new TextView(this);
        view.setBackgroundColor(Color.parseColor("#178aba"));
        view.setGravity(Gravity.CENTER);

        textView.setTextColor(Color.parseColor("#ffffff"));
        textView.setText("RN TEST");
        textView.setGravity(Gravity.CENTER);
        textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 40);

        view.addView(textView);
        return view;
    }
}
