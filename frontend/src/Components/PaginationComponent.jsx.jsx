import React from "react";
import { Link } from "react-router-dom";

function PaginationComponent({ pagination, params, setParams }) {
  return (
    <div style={{ marginTop: "10px", float: "right" }}>
      <nav>
        <ul className="pagination">
          {pagination.hasPreviousPage ? (
            <li className="page-item ">
              <Link
                className="page-link"
                to={''}
                aria-label="Previous"
                onClick={() =>
                  setParams({
                    ...params,
                    page: params.page - 1,
                  })
                }>
                <span aria-hidden="true">&laquo;</span>
              </Link>
            </li>
          ) : (
            <li className="page-item">
              <a className="page-link" href={undefined} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
          )}

          {pagination.hasNextPage ? (
            <li className="page-item">
              <Link
                className="page-link"
                aria-label="Next"
                to={''}
                onClick={() =>
                  setParams({
                    ...params,
                    page: params.page + 1,
                  })
                }>
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </li>
          ) : (
            <li className="page-item disabled">
              <a className="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default PaginationComponent;
