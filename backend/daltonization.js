function hsvToRgb(h, s, v) {
    // Convert hue from 0-180 to 0-1
    h = h / 360;

    let r, g, b;

    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ];
}


// daltonization.js
function daltonizeColor(rgb) {
    let blindness_type = "red";
    // Convert RGB to LMS
    const [r, g, b] = rgb.map(v => v);

    //check for white
    if (r >= 0.9 * 255 && g >= 0.9 * 255 && b >= 0.9 * 255) {
        return [Math.round(r), Math.round(g), Math.round(b)]
    }
    else if (blindness_type === "red") {
        const l = 17.8824 * r + 43.5161 * g + 4.11935 * b;
        const m = 3.45565 * r + 27.1554 * g + 3.6714 * b;
        const s = 0.0299566 * r + 0.184309 * g + 1.46709 * b;

        // Simulate protanopia (red-blindness)
        const l_pro = 0.0 * l + 2.02344 * m + -2.52581 * s;
        const m_pro = 0 * l + 1 * m + 0 * s;
        const s_pro = 0.0 * l + 0.0 * m + 1.0 * s;

        // Convert LMS back to RGB
        const r_pro = 0.0809444479 * l_pro - 0.1310504409 * m_pro + 0.1166721066 * s_pro;
        const g_pro = 0.113614708 * l_pro - 0.0102485335 * m_pro + 0.0540193266 * s_pro;
        const b_pro = -0.000365296938 * l_pro - 0.00412161469 * m_pro + 0.693511405 * s_pro;

        // diff btwn original and simulated rgb
        const diff_r_red = r - r_pro;
        const diff_g_red = g - g_pro;
        const diff_b_red = b - b_pro;

        // shift colors towards visible spectrum
        const r_map_red = 0;
        const g_map_red = 0.7 * diff_r_red + 1 * diff_g_red;
        const b_map_red = 0.7 * diff_r_red + 1 * diff_b_red;

        //add shifted colors to original

        const red_final = r + r_map_red;
        const green_final = g + g_map_red;
        const blue_final = b + b_map_red;

        return [Math.round(red_final), Math.round(green_final), Math.round(blue_final)];
    }

    else if (blindness_type === "green") {
        const l = 17.8824 * r + 43.5161 * g + 4.11935 * b;
        const m = 3.45565 * r + 27.1554 * g + 3.6714 * b;
        const s = 0.0299566 * r + 0.184309 * g + 1.46709 * b;

        // Simulate deutranopia (green-blindness)
        const l_pro = 1 * l + 0 * m + 0 * s;
        const m_pro = 0.49421 * l + 0 * m + 1.24827 * s;
        const s_pro = 0.0 * l + 0.0 * m + 1.0 * s;

        // Convert LMS back to RGB
        const r_pro = 0.0809444479 * l_pro - 0.1310504409 * m_pro + 0.1166721066 * s_pro;
        const g_pro = 0.113614708 * l_pro - 0.0102485335 * m_pro + 0.0540193266 * s_pro;
        const b_pro = -0.000365296938 * l_pro - 0.00412161469 * m_pro + 0.693511405 * s_pro;

        // diff btwn original and simulated rgb
        const diff_r_green = r - r_pro;
        const diff_g_green = g - g_pro;
        const diff_b_green = b - b_pro;

        // shift colors towards visible spectrum
        const r_map_green = 1 * diff_r_green + 0.7 * diff_g_green;
        const g_map_green = 0;
        const b_map_green = 0.7 * diff_g_green + 1 * diff_b_green;

        //add shifted colors to original

        const red_final = r + r_map_green;
        const green_final = g + g_map_green;
        const blue_final = b + b_map_green;

        return [Math.round(red_final * 255), Math.round(green_final * 255), Math.round(blue_final * 255)];
    }

    else if (blindness_type === "blue") {
        let s, h;
        const V = Math.max(r, g, b);

        if (V !== 0) {
            s = (V - Math.min(r, g, b)) / V;
        }
        else {
            s = 0;
        }
        if (r === g === b) {
            h = 0;
        }
        else if (V === r) {
            h = (60 * (g - b)) / (V - Math.min(r, g, b));
        }
        else if (V === g) {
            h = 120 + (60 * (b - r)) / (V - Math.min(r, g, b));
        }
        else if (V === b) {
            h = 240 + (60 * (r - b)) / (V - Math.min(r, g, b));
        }
        h = h / 2;

        h = h + 0.3 * 180;

        if (h <= 0) { h = 0; }
        else if (h > 180) { h = 180 - h + 360; }

        return hsvToRgb(h, s, v);

    }

}

module.exports = { daltonizeColor };

