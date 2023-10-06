export function request(form, url, ref, insertPage) {
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
                insertPage(ref);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    });

    let btnCancel = form.querySelector("#form-cancel");
    btnCancel.addEventListener("click", (e) => {
        insertPage(ref);
    });
}
