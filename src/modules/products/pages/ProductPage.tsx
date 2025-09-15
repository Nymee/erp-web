import EnhancedTable from "../../../shared/components/Table"

const productPage=()=>{

    const [query, setQuery] = useState<BasicQuery>({
    page: 0,                
    limit: 10,              
    order: "asc",
    orderBy: "name",
    search: "",
    });

    return(
        <div>
            <EnhancedTable<Client>
                    order={order}
                    setOrder={setOrder}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    selected={selected}
                    setSelected={setSelected}
                    page={page}
                    setPage={setPage}
                    dense={dense}
                    setDense={setDense}
                    rowsPerPage={rowsPerPage}
                    rows={clients}
                    headCells={headCells}
                    id="id"
                  />
        </div>
    )
}