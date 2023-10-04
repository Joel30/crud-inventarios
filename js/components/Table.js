export default (columnNames, data) => {
    let rows = ``;
    for (const column of data) {

        let actions = `
            <button class="btn btn-warning btn-sm" title="Editar" data-id="${column.id}">
                <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-danger btn-sm" title="Eliminar" data-id="${column.id}">
                <i class="bi bi-trash3-fill"></i>
            </button>
        `
        
        rows += `<tr>
            <td>${column.category}</td>
            <td>${column.title}</td>
            <td>${column.author}</td>
            <td>${column.price}</td>
            <td nowrap>${actions}</td>
        </tr>`;
    }
    return `        
        <div class="table-responsive" style="overflow-x: auto;">
            <table class="table align-middle">
                <thead class="table-light">
                    <tr>
                        <th>Categoría</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="list_category">
                ${
                    rows ? rows : `<tr> <td colspan="100%" class="text-center" >No se encontraron registros</td></tr>`
                }
                </tbody>
            </table>
        </div>`;
}