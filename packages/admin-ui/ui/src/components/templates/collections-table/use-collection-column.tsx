import moment from "moment"
import { useMemo } from "react"
import Tooltip from "../../atoms/tooltip"
import ImagePlaceholder from "../../fundamentals/image-placeholder"

const useCollectionTableColumn = () => {
  const columns = useMemo(
    () => [
      {
          Header: "Title",
          accessor: "title",
        Cell: ({ row: { original } }) => {
          return (
            <div className="flex items-center">
              <div className="my-1.5 mr-4 flex h-[40px] w-[30px] items-center">
                {original.thumbnail ? (
                  <img
                    src={original.thumbnail}
                    className="rounded-soft h-full object-cover"
                    alt={original.title}
                  />
                ) : (
                  <ImagePlaceholder />
                )}
              </div>
              {original.title}
            </div>
          )
        },
      },
      {
        Header: "Handle",
        accessor: "handle",
        Cell: ({ cell: { value } }) => <div>/{value}</div>,
      },
        {
            Header: "Type",
            accessor: "type",
            Cell: ({ row: { original } }) => {
                return <div className="flex items-center">{original.type}</div>
            },
        },
      {
        Header: "Created At",
        accessor: "created_at",
        Cell: ({ cell: { value } }) => (
          <Tooltip content={moment(value).format("DD MMM YYYY hh:mm A")}>
            {moment(value).format("DD MMM YYYY")}
          </Tooltip>
        ),
      },
      {
        Header: "Updated At",
        accessor: "updated_at",
        Cell: ({ cell: { value } }) => (
          <Tooltip content={moment(value).format("DD MMM YYYY hh:mm A")}>
            {moment(value).format("DD MMM YYYY")}
          </Tooltip>
        ),
      },
      {
        Header: "Products",
        accessor: "products",
        Cell: ({ cell: { value } }) => {
          return <div>{value?.length || "-"}</div>
        },
      },
    ],
    []
  )

  return [columns]
}

export default useCollectionTableColumn
