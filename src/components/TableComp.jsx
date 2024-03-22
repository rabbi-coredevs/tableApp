

const LimRaw= ({onChangeLimit=()=>undefined})=>{
  return (
    <div>
    <label>Showing 1 results</label>
    <select onChange={(e)=>onChangeLimit(e.target.value)}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
    </select>
    </div>
  )
}

const TableComp = ({ config = [], data = [], actions =[], styles = {}, pagination= null}) => {

    const TableHeadings = config.map(({head, Head, headProp={}},headIdx) =>Head? <Head key={head+ headIdx} {...headProp}/>:head);
    const action = actions.map((each)=>each.name);
    const { Next = null, Prev = null } = pagination?.buttons || {}
    const {LimitComp=LimRaw} =pagination;
    const handelPagination = (num) => {
      if ((num > 0) && (num <= pagination.totalPage || 0)) return pagination.onChange(num);
    }

    const getPageRange = () => {
      const range = [];
      const maxVisiblePages = 5; // Maximum number of visible page numbers
      const ellipsis = '...';
  
      let startPage = Math.max(1, pagination.page - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;
  
      if (endPage > pagination.totalPage) {
        endPage = pagination.totalPage;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
  
      for (let i = startPage; i <= endPage; i += 1) {
        range.push(i);
      }
  
      if (startPage > 1) {
        range.unshift(ellipsis);
        range.unshift(1);
      }
  
      if (endPage < pagination.totalPage) {
        range.push(ellipsis);
        range.push(pagination.totalPage);
      }
  
      return range;
    };

    const renderPageNumbers = () => {
      const range = getPageRange();
  
      return range.map((pageNumber) => {
        const isEllipsis = pageNumber === '...';
        const isCurrentPage = pageNumber === pagination?.page;
  
  
        return (
          <button
          key={pageNumber+'page'}
            style={{ ...styles?.pagination?.pageButton?.style, ...isCurrentPage && styles?.pagination?.activePage?.style }}
            className={`${styles?.pagination?.pageButton?.className} ${isCurrentPage ? styles?.pagination?.activePage?.className : ''}`}
            onClick={() => handelPagination(pageNumber)}
            disabled={isEllipsis}
          >
            {isEllipsis ? '...' : pageNumber}
          </button>
        );
      });
    };
  
 
    return (
      <div style={{...styles?.wrapper}}>
        <table>
          <thead >
            <tr style={{...styles?.table?.header?.style}} className="">
              {TableHeadings.map((tableHead, idx) => (
                <th key={tableHead + idx} className="border p-2" style={{...styles?.table?.header}} >
                  {tableHead}
                </th>
              ))}
              {
                action.map((act,actIdx)=>(
                  <th key={act + actIdx} className="border p-2 ">
                    {act}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td>
                  <div className=" text-center text-3xl">No data found</div>
                </td>
              </tr>
            ) : (
              <>
                {
                  data.map((row, indx) => <tr key={row.id+ indx}>
                          {
                          config.map(({ key, value, onClick, modify = ()=> undefined,Comp }, ind) => {
                            if(Comp) return <Comp key={`key-${ind}`} data = {row}/>
                            if (key.includes('.')) {
                              value = key.split('.').reduce((obj, next) => obj?.[next], row);
                            } else {
                              value = row[key];
                            }
                            return <td 
                            key={`key-${ind}`}
                            onClick={() => onClick && onClick(row)}
                            style={{cursor:"pointer"}}
                            >{modify(value) || value}</td>;
                          })
                          }
                    {
                      actions.map(({ name, Icon, handleClicks = [] }, actionIdx) => <td key={row.id + name + actionIdx} className="flex" >
                       <Icon handleClicks = {handleClicks}/>
                      </td>
                    )}
                      </tr>
                      )                 
                }    
              </>
            )
            }
          </tbody>
        </table>
        {
        pagination && <div className={`${styles?.pagination?.wrapper?.className}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", ...styles?.pagination?.wrapper?.style }}>
         { pagination.chooseLimit? <LimitComp onChangeLimit={pagination.onChangeLimit}/>:<p className={`${styles?.pagination?.text?.className}`} style={{ ...styles?.pagination?.text?.style }}>
            Showing {pagination.totalDocs > 0 ? pagination.totalDocs >= pagination.page * pagination.limit ? pagination.page * pagination.limit : pagination.totalDocs : 0} of {pagination.totalDocs} results
          </p>}
          <div className={`${styles?.pagination?.buttonWrapper?.className}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-around", gap: '20px', ...styles?.pagination?.buttonWrapper?.style }}>
            {
              Prev ?
                <Prev onClick={() => handelPagination(pagination.page - 1)} className={`${styles?.pagination?.buttons?.className} ${styles?.pagination?.prev?.className}`} style={{ cursor: 'pointer', ...styles?.pagination?.buttons?.style, ...styles?.pagination?.prev?.style }} />
                : <button onClick={() => handelPagination(pagination.page - 1)} className={`${styles?.pagination?.buttons?.className} ${styles?.pagination?.prev?.className}`} style={{ cursor: 'pointer', ...styles?.pagination?.buttons?.style, ...styles?.pagination?.prev?.style }}>Prev</button>
            }
            {
              pagination.showPage && renderPageNumbers()
            }
            {
              Next ?
                <Next onClick={() => handelPagination(pagination.page + 1)} className={`${styles?.pagination?.buttons?.className} ${styles?.pagination?.next?.className}`} style={{ cursor: 'pointer', ...styles?.pagination?.buttons?.style, ...styles?.pagination?.next?.style }} />
                : <button onClick={() => handelPagination(pagination.page + 1)} className={`${styles?.pagination?.buttons?.className} ${styles?.pagination?.next?.className}`} style={{ cursor: 'pointer', ...styles?.pagination?.buttons?.style, ...styles?.pagination?.next?.style }}>Prev</button>
            }
          </div>
        </div>
      }
      </div>
    );
  };
  
  export default TableComp;
  