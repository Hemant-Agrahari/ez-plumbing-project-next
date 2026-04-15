"use client";
import type { NextPage } from "next";
import styles from "./page.module.css";
import Button from "@/components/UI/Button";
import { usePathname } from "next/navigation";
import DynamicTable from "@/components/UI/Table";
import DynamicSearch from "@/components/UI/Search";
import HtmlDropdown from "@/components/UI/HtmlDropdown";
import { useState, useMemo, useEffect } from "react";
import { MRT_PaginationState } from "material-react-table";
import { requestHandler } from "@/helper/requestHandler";
import { asyncHandler } from "@/utils/asyncHandler";
import Navigation from "@/components/Layout/Navigation/Navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { options } from '@/utils/tablePagination';

import { usePermissions } from "@/hooks/usePermissions";
const AddSubAdmin: NextPage = () => {
    const [data, setData] = useState([]);
    const [inputQuery, setInputQuery] = useState('');
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });
    const pathname = usePathname();
    const cleanedPathname = pathname.startsWith('/') ? pathname.slice(1) : pathname;
    const { canView, canAdd, canEdit, canDelete } = usePermissions(`${cleanedPathname}`);
    const showActionsColumn = canView || canEdit || canDelete;
    // console.log(canView, canAdd, canEdit, canDelete);


    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                size: 20,
            },
            {
                id: 'src',
                header: 'Profile Img',
                size: 50,
                Cell: ({ row }: any) => (
                    <img
                        className={`"mx-2 ${styles.profileImage}`}
                        src={row.original.profile}
                        alt={row.original.name}
                        width={100}
                        height={100}
                    />
                ),
            },
            {
                accessorKey: 'name',
                header: 'Name',
                size: 50,
            },
            {
                accessorKey: 'email',
                header: 'Email',
                size: 50,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 50,
                Cell: ({ row }: any) => (
                    <span
                        style={{
                            color: row.original.status === 'active' ? 'green' : 'red',
                        }}
                    >
                        {row.original.status}
                    </span>
                ),
            },
            ...(showActionsColumn
                ? [
                    {
                        id: 'actions',
                        header: 'Actions',
                        size: 50,
                        Cell: ({ row }: any) => (
                            <>
                                {canEdit && (
                                    <Link href={`/sub-admin-management/edit?subAdminId=${row.original.id}`}>
                                        <img
                                            alt="edit"
                                            className="mr-2"
                                            src="/images/edit.svg"
                                            width={20}
                                            height={20}
                                        />
                                    </Link>
                                )}
                                {canView && (
                                    <Link href={`/sub-admin-management/view?subAdminId=${row.original.id}`}>
                                        <img
                                            alt="view"
                                            className="mx-2"
                                            src="/images/view.svg"
                                            width={20}
                                            height={20}
                                        />
                                    </Link>
                                )}
                                {canDelete && (
                                    <img
                                        alt="delete"
                                        className={`${styles.cursorPointer} ml-2`}
                                        src="/images/delete.svg"
                                        width={20}
                                        height={20}
                                        onClick={asyncHandler(async () => {
                                            await handleDelete(row);
                                            await fetchData();
                                        })}
                                    />
                                )}
                            </>
                        ),
                    }
                ]
                : [])

        ],
        [data]
    );


    const handleDelete = async (row: any) => {
        try {
            const response = await requestHandler(
                `/subadmin/delete?subAdminId=${row.original.id}`,
                null,
                "get"
            );

            if (response.status === 200) {
                toast.success("Sub-admin deleted successfully");
                fetchData()
            } else {
                toast.error("Failed to delete sub-admin");
            }
        } catch (error) {
            console.error("Error deleting sub-admin:", error);
            toast.error("An error occurred while deleting the sub-admin");
        }
    };


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputQuery(event.target.value);
    };

    const handleSearch = () => {
        setPagination((prev) => ({
            ...prev,
            pageIndex: 1,
        }));
    };

    const handlePageSizeChange = (value: string) => {
        setPagination((prev) => ({
            ...prev,
            pageSize: Number(value),
            pageIndex: 1,
        }));
    };
    const fetchData = asyncHandler(async () => {
        const response = await requestHandler(
            `/subadmin/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize}&search=${inputQuery}`,
            null,
            "get"
        );
        const fetchedData = response.data.map((item: any) => ({
            id: item._id,
            name: item.name,
            src: item.src,
            profile: item.profile,
            email: item.email,
            status: item.status,
            isChecked: false,
        }));
        setData(fetchedData);
    })
    useEffect(() => {
        fetchData()
    }, [pagination.pageIndex, pagination.pageSize, inputQuery]);

    return (
        <>
            <Navigation profile="Sub Admin Management"
                user01="/images/user01.svg"
                bell01="/images/bell01.svg" />
            <div className="main">
                {canAdd &&
                    <Button
                        text="Add New Sub Admin"
                        link={`${pathname}/add-new-sub-admin`}
                        className={`mb-4 ${styles.btnStyle}`}
                    />
                }

                <div style={{ marginBottom: '1rem' }}>
                    <div className={styles.SearchField}>
                        <DynamicSearch
                            type="text"
                            placeholder="Search"
                            value={inputQuery}
                            onChange={handleSearchChange}
                        />
                        <Button
                            text="Search"
                            type="submit"
                            handle={handleSearch}
                            className={styles.BtnBlue}
                        />
                        <HtmlDropdown
                            className={styles.designOption}
                            name="designOption"
                            value={pagination.pageSize.toString()}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handlePageSizeChange(String(e.target.value))}
                            options={options}
                            placeholder=""
                        />
                    </div>
                </div>

                <div>

                    <DynamicTable
                        data={data}
                        columns={columns}
                        pagination={pagination}
                        setPagination={setPagination}
                    />
                </div>
            </div>
        </>
    );
};

export default AddSubAdmin;

// [{ "moduleName": "Sub-admin Management", "moduleValue": true, "view": true, "edit": true, "add": true, "delete": true },
// { "moduleName": "Categories Management", "moduleValue": true, "view": true, "edit": true, "add": true, "delete": true },
// { "moduleName": "Media Management", "moduleValue": true, "view": true, "edit": true, "add": true, "delete": true },
// { "moduleName": "Short Code Management", "moduleValue": true, "view": true, "edit": true, "add": true, "delete": true },
// { "moduleName": "Notification", "moduleValue": true, "view": true, "edit": true, "add": true, "delete": true },
// { "moduleName": "Seo Management", "moduleValue": true, "view": true, "edit": true, "add": true, "delete": true },
// { "moduleName": "Pages Management", "moduleValue": true, "view": true, "edit": true, "add": true, "delete": true },
// { "moduleName": "asd", "moduleValue": true, "view": true, "edit": true, "add": true, "delete": true },
// { "moduleName": "asdasd", "moduleValue": true, "view": true, "edit": true, "add": true, "delete": true },
// { "moduleName": "aaaaaa", "moduleValue": true, "view": true, "edit": true, "add": true, "delete": true },
// { "moduleName": "testing", "moduleValue": true, "view": true, "edit": true, "add": true, "delete": true }]