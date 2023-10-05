export default async function selectData(path, col, id = false, text="Elija un opción") {
    let select = await fetch(path)
        .then(resp => resp.json())
        .then(data => {
            let select = ``;
            if(!data.data || data.data.length === 0){
                select = "<option value> -- No hay registros -- </option>"
                return;
            }

            select += `<option value> -- ${text} -- </option>`;

            for (let lista of data.data) {
                let info = "";
                if(typeof(col.name) != "string") {
                    for (let i = 0; i < col.name.length; i++) {
                        info += lista[col.name[i]] + ": ";
                    }
                    info = info.substring(0, info.length - 2);
                } else {
                    info = lista[col.name];
                }

                if (id && id == lista[col.id]) {
                    select += `<option value="${lista[col.id]}" selected> ${info} </option>`;
                } else {
                    select += `<option value="${lista[col.id]}"> ${info} </option>`;
                }
            }

            return select;
        });
    return select;
}