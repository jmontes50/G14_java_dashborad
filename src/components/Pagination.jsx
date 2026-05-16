export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) return null

  const { page, totalPages, hasNextPage, hasPrevPage } = pagination

  return (
    <div className="flex justify-center items-center gap-4">
      <div className="join">
        <button
          className={`join-item btn btn-sm ${!hasPrevPage ? 'btn-disabled' : ''}`}
          onClick={() => hasPrevPage && onPageChange(page - 1)}
        >
          «
        </button>

        <button className="join-item btn btn-sm btn-active">
          {page} / {totalPages}
        </button>

        <button
          className={`join-item btn btn-sm ${!hasNextPage ? 'btn-disabled' : ''}`}
          onClick={() => hasNextPage && onPageChange(page + 1)}
        >
          »
        </button>
      </div>
    </div>
  )
}
