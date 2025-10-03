window.onload = () => {
    /**
     * @param {number} hour - Current hour (0-23)
     * @param {number} start - Wake up hour (0-23)
     * @param {number} end - Bed time hour (0-23)
     * @returns {boolean} - True if person is awake, false if sleeping
     */
    function isAwake(hour, start, end) {
        if (start === end) { 
            return true; 
        }
        if (start < end)   { 
            return hour >= start && hour < end; 
        }
        return hour >= start || hour < end;
    }

    function time() {
        const now = new Date();
        const nyStr = now.toLocaleTimeString("en-US", {
            timeZone: "America/New_York", 
            hour12: false // Use 24-hour format
        });
        // Seoul time (Korea Standard Time)
        const krStr = now.toLocaleTimeString("en-US", {
            timeZone: "Asia/Seoul",
            hour12: false // Use 24-hour format
        });

        const timeBeabadoobe = document.getElementById("timeBeabadoobe"); 
        const timeJames = document.getElementById("timeJames"); 
        
        if (timeBeabadoobe) timeBeabadoobe.textContent = nyStr; 
        if (timeJames) timeJames.textContent = krStr;

        const wakeStartJamesEl = document.getElementById("wakeStartJames"); 
        const wakeEndJamesEl = document.getElementById("wakeEndJames");
        const wakeStartBeeEl = document.getElementById("wakeStartBeabadoobe"); 
        const wakeEndBeeEl = document.getElementById("wakeEndBeabadoobe"); 
        
        const wakeStartJames = wakeStartJamesEl ? Number(wakeStartJamesEl.value) : 8; 
        const wakeEndJames = wakeEndJamesEl ? Number(wakeEndJamesEl.value) : 23; 
        const wakeStartBee = wakeStartBeeEl ? Number(wakeStartBeeEl.value) : 8; 
        const wakeEndBee = wakeEndBeeEl ? Number(wakeEndBeeEl.value) : 23;

        const nyHour = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" })).getHours(); 
        const krHour = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" })).getHours();

        const statusBeabadoobe = document.getElementById("statusBeabadoobe"); 
        const statusJames = document.getElementById("statusJames"); 
        
        // Calculate if each person is currently awake
        const beabadoobeAwake = isAwake(nyHour, wakeStartBee, wakeEndBee);
        const jamesAwake = isAwake(krHour, wakeStartJames, wakeEndJames); 
        

        if (statusBeabadoobe) {
            statusBeabadoobe.textContent = `Status: ${beabadoobeAwake ? "Awake" : "Sleeping"}`;
        }
        if (statusJames) {
            statusJames.textContent = `Status: ${jamesAwake ? "Awake" : "Sleeping"}`; 
        }

        const messagesAreaJames = document.getElementById("messagesAreaJames"); 
        const messagesAreaBeabadoobe = document.getElementById("messagesAreaBeabadoobe"); 
        
        // Determine if the "Call Time Baby!" image should be shown
        const shouldShowImage = beabadoobeAwake && jamesAwake; // Both must be awake
        
        if (messagesAreaJames) {
            if (shouldShowImage) {
                messagesAreaJames.classList.add("with-calltimebaby"); 
            } else {
                messagesAreaJames.classList.remove("with-calltimebaby"); 
            }
        }
            if (messagesAreaBeabadoobe) {
            if (shouldShowImage) {
                messagesAreaBeabadoobe.classList.add("with-calltimebaby"); 
            } else {
                messagesAreaBeabadoobe.classList.remove("with-calltimebaby"); 
            }
        }
    }

    // Set up interval to run the time function every 1000ms (1 second)
    setInterval(time, 1000);
    // Run the function immediately when page loads (don't wait for first interval)
    time();
}

        