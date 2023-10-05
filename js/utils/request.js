async function redirect(form, rdr = false) {
    let action = form.getAttribute("action");
    if(action) {
        await DELAY(1500);

        window.location.href = action;
        return;
    }
    if(rdr){
        rdr();
    }
    form.reset();
}

export function request(form, url, {ref, insertPageBook}) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = new FormData(form);
    
        let result = {};
        try {
            result = await fetch(url, {
                method: "POST",
                body: data
            }) .then(res => res.json())

            console.log(result);

            if (!result.message) {
                insertPageBook(ref);
            }
        } catch (error) {
            console.log("Error");
            console.log(error);
        }


    });

    let btnCancel = form.querySelector("#form-cancel");
    btnCancel.addEventListener("click", (e) => {
        insertPageBook(ref);
    });
    
}
