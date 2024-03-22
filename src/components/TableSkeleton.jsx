export default function TableSkeleton({
  config = [{
    head: 'table',
    key: 'formed',
  }],
  actions = [],
  styles = {},
  data = [],
  pagination = null,
  loading = false,
  LoadingIcon = () => <p>Loading...</p>
}) {
  const header = config.map((ech) => ech.head);
  const action = actions.map((ech) => ech.name);
  const { Next = null, Prev = null } = pagination?.buttons || {}

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
    <section className={`${styles?.wrapper?.className}`} style={{ width: "100%", ...styles?.wrapper?.style }}>
      <table className={`${styles?.table?.main?.className}`} style={{ width: "100%", ...styles?.table?.main?.style }}>
        <thead className={`${styles?.table?.headerGroup?.className}`} style={{ ...styles?.table?.headerGroup?.style }}>
          <tr className={`${styles?.table?.headerRow?.className}`} style={{ ...styles?.table?.headerRow?.style }}>
            {
              header.map((ech, idx) => <th key={ech + idx} className={`${styles?.table?.header?.className}`} style={{ ...styles?.table?.header?.style }}>{ech}</th>)
            }
            {
              action.map((eac, idx) => <th key={eac + idx} className={`${styles?.table?.headerAction?.className}`} style={{ ...styles?.table?.headerAction?.style }}>{eac}</th>)
            }
          </tr>
        </thead>
        <tbody className={`${styles?.table?.body?.className}`} style={{ ...styles?.table?.body?.style }}>
          {
            data.length === 0 || loading
              ? (
                <tr>
                  <td colSpan={config.length + actions.length}>
                    <div style={{ margin: "auto", ...styles?.table?.loadingWrapper?.style }} className={`${styles?.table?.loadingWrapper?.className} text-center`}>{loading ? <LoadingIcon className={`${styles?.table?.loading?.className}`} style={{ width: '5%', height: '5%', margin: "auto", ...styles?.table?.loading?.style }} /> : 'No data found.'}</div>
                  </td>
                </tr>
              ) : (<>
                {
                  data.map((eDR, indx) => <tr key={eDR.id + indx} className={`${styles?.table?.row?.className}`} style={{ ...styles?.table?.row?.style }}>
                    {
                      config.map(({
                        key,
                        value,
                        onClick,
                        Comp,
                        modify = () => undefined,
                      }, index) => {
                        if (Comp) return <td key={eDR.id + key + index} className={`${styles?.table?.rowData?.className}`} style={{ ...styles?.table?.rowData?.style }}>
                          <Comp data={eDR} />
                        </td>
                        if (key.includes('.')) value = key.split('.').reduce((obj = {}, k) => obj?.[k], eDR);
                        else value = eDR[key];
                        return <td
                          key={eDR.id + key + index}
                          onClick={() => onClick && onClick(eDR)}
                          className={`${styles?.table?.rowData?.className}`}
                          style={{ cursor: onClick ? 'pointer' : 'default', ...styles?.table?.rowData?.style }}
                        >
                          {modify(value) || value}
                        </td>
                      })
                    }
                    {
                      actions.map(({ name, Icon, onClick = () => undefined, title }, aIND) => <td key={eDR.id + name + aIND} className={`${styles?.table?.rowAction?.className}`} style={{ ...styles?.table?.rowAction?.style }}>
                        <Icon className={`${styles?.table?.actionIcon?.className}`} style={{ cursor: 'pointer', ...styles?.table?.actionIcon?.style }} title={title} onClick={() => onClick(eDR, name)} />
                      </td>)
                    }
                  </tr>)
                }
              </>)
          }
        </tbody>
      </table>
      {
        pagination && <div className={`${styles?.pagination?.wrapper?.className}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", ...styles?.pagination?.wrapper?.style }}>
          <p className={`${styles?.pagination?.text?.className}`} style={{ ...styles?.pagination?.text?.style }}>
            Showing {pagination.totalDocs > 0 ? pagination.totalDocs >= pagination.page * pagination.limit ? pagination.page * pagination.limit : pagination.totalDocs : 0} of {pagination.totalDocs} results
          </p>
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
    </ section>
  );
}