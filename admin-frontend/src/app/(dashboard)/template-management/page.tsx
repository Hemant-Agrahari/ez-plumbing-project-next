"use client";
import Button from "@/components/UI/Button";
import DynamicTable from "@/components/UI/Table";
import DynamicSearch from "@/components/UI/Search";
import HtmlDropdown from "@/components/UI/HtmlDropdown";
import styles from "@/app/(dashboard)/[slug]/page.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MRT_PaginationState } from "material-react-table";
import { requestHandler } from "@/helper/requestHandler";
import { asyncHandler } from "@/utils/asyncHandler";
import Navigation from "@/components/Layout/Navigation/Navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { usePermissions } from "@/hooks/usePermissions";
import { options } from "@/utils/tablePagination";

const Page = () => {
  const [data, setData] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0, pageSize: 5
  });
  const pathname = usePathname();
  const cleanedPathname = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const { canView, canAdd, canEdit, canDelete } = usePermissions(`${cleanedPathname}`);
  const showActionsColumn = canView || canEdit || canDelete;

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: '#',
        size: 50,
      },
      {
        accessorKey: 'title',
        header: 'Title',
        size: 100,
      },
      {
        accessorKey: 'key',
        header: 'Key',
        size: 50,
      },
      ...(showActionsColumn
        ? [
          {
            id: 'actions',
            header: 'Action',
            size: 100,
            Cell: ({ row }: any) => (
              <>
                {canEdit && (
                  <Link href={`/template-management/edit?templateId=${row.original.id}`}>
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
                  <Link href={`/template-management/view?templateId=${row.original.id}`}>
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
                    onClick={() => handleDelete(row)}
                  />
                )}
              </>
            ),
          }

        ]
        : [])

    ],
    [canEdit, canView, canDelete]
  );

  const handleDelete = asyncHandler(async (row: any) => {
    const rowId = row.original.id;
    const response = await requestHandler(`/template/delete?templateId=${rowId}`, {}, 'get');
    if (response.status === 200) {
      toast.success(response.message || 'Deleted Successfully');
      fetchData(); // Refresh data after successful deletion
    } else {
      toast.error(response.message || 'Failed to Delete');
    }
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
  };

  const handleSearch = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  };

  const handlePageSizeChange = (value: string) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: Number(value),
      pageIndex: 0,
    }));
  };

  const fetchData = async () => {
    const response = await requestHandler(
      `/template/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize}&search=${inputQuery}`,
      {},
      "get"
    );

    const fetchedData = response.data.map((item: any) => ({
      id: item._id,
      key: item.key,
      title: item.title,
    }));
    setData(fetchedData);
  };

  useEffect(() => {
    asyncHandler(fetchData)();
  }, [pagination.pageIndex, pagination.pageSize, inputQuery]);

  return (
    <>
      <Navigation profile="Template Management"
        user01="/images/user01.svg"
        bell01="/images/bell01.svg" />
      <div className="main">
        {canAdd &&
          <Button
            text="Add New"
            link={`template-management/create-${cleanedPathname}`}
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

        <DynamicTable
          data={data}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </>
  );
};

export default Page;
