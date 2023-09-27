import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function PaginationLinks({ meta, onPageClick }) {

    function onClick(ev, link) {
        ev.preventDefault();
        if (!link.url) {
            return;
        }
        onPageClick(link)
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md mt-4">
            {/* <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    onClick={ev => onClick(ev, meta.links[0])}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#"
                    onClick={ev => onClick(ev, meta.links[meta.links.length - 1])}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </a>
            </div> */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                {/* <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{meta.from}</span> to{" "}
                        <span className="font-medium">{meta.to}</span> of &nbsp;
                        <span className="font-medium">{meta.total}</span> results
                    </p>
                </div> */}
                <div className="wrapper">
                    {meta.total > meta.per_page && <nav
                        className="isolate inline-flex -space-x-px rounded-md"
                        aria-label="Pagination"
                    >

                        {meta.links && meta.links.map((link, ind) => (
                            <a
                                href="#"
                                onClick={ev => onClick(ev, link)}
                                key={ind}
                                aria-current="page"
                                className={
                                    "relative z-10 inline-flex items-center border   px-4 py-2 text-sm font-medium focus:z-20 hover:bg-gray-50 "
                                    + (ind === 0 ? 'rounded-l-md ' : '')
                                    + (ind === meta.links.length - 1 ? 'rounded-r-md ' : '')
                                    + (link.active ? 'page-link-active ' : '')
                                }
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            >
                            </a>
                        ))}
                    </nav>
                    }
                </div>
            </div>
        </div>


        // <div className="wrapper">
        //     <nav aria-label="Page navigation example">
        //         <ul className="pagination">
        //             <li className="page-item">
        //                 <a className="page-link" href="#">Previous</a>
        //             </li>
        //             <li className="page-item"><a className="page-link" href="#">1</a></li>
        //             <li className="page-item"><a className="page-link" href="#">2</a></li>
        //             <li className="page-item"><a className="page-link" href="#">3</a></li>
        //             <li className="page-item"><a className="page-link" href="#">4</a></li>
        //             <li className="page-item"><a className="page-link" href="#">5</a></li>
        //             <li className="page-item"><a className="page-link" href="#">6</a></li>
        //             <li className="page-item"><a className="page-link" href="#">Next</a></li>
        //         </ul>
        //     </nav>
        // </div>

    );
}
