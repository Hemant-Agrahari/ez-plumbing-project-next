"use client";
import Button from "@/components/UI/Button";
import DynamicTable from "@/components/UI/Table";
import DynamicSearch from "@/components/UI/Search";
import HtmlDropdown from "@/components/UI/HtmlDropdown";
import styles from "./page.module.css";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MRT_PaginationState } from "material-react-table";
import { requestHandler } from "@/helper/requestHandler";
import { asyncHandler } from "@/utils/asyncHandler";
import Navigation from "@/components/Layout/Navigation/Navigation";
import { usePermissions } from "@/hooks/usePermissions";
import { options } from '@/utils/tablePagination';
import { toast } from "react-toastify";
import { convertSlugToTitle } from "@/utils/capitalizeEachWord";
const Page = () => {
  const [data, setData] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 1000,
  });
  const router = useParams();
  const { canView, canAdd, canEdit, canDelete } = usePermissions(`${router.slug}`);
  const titleNav = convertSlugToTitle(router.slug)

  const pathname = usePathname();
  const cleanedPathname = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const Router = useRouter()
  const handleEdit = (row: any) => {
    321
    Router.push(`/${router.slug}/view/view?pageId=${row.original.id}`);
  };

  const handleView = (row: any) => {
  };

  const handleDelete = async (row: any) => {
    const rowId = row.original.id;
    try {
      const response = await requestHandler(
        `/pages/delete?pageId=${rowId}`,
        {},
        "get"
      );
      if (response.status === 200) {
        toast.success(response.message || "Process Successfully");
        await fetchData();
        toast.success(response.message || "Deleted Successfully");
        // dispatch(fetchPages());
      } else {
        toast.error(response.message || "Failed to Delete");
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };


  const columns = useMemo(() => {
    const showActionsColumn = canView || canEdit || canDelete;

    const columnsList = [
      {
        accessorKey: 'id',
        header: '#',
        size: 100,
      },
      {
        accessorKey: 'title',
        header: 'Title',
        size: 100,
      },
      {
        accessorKey: 'uniqId',
        header: 'uniqId',
        size: 100,
      },
      ...(showActionsColumn
        ?
        [
          {
            id: 'actions',
            header: 'Action',
            size: 100,
            Cell: ({ row }: any) => (
              <>
                {canEdit && (
                  <img
                    alt="edit"
                    className={`${styles.cursorPointer} mr-2`}
                    src="/images/edit.svg"
                    width={20}
                    height={20}
                    onClick={() => handleEdit(row)}
                  />
                )}
                {canView && (
                  <img
                    alt="view"
                    className={`${styles.cursorPointer} mx-2`}
                    src="/images/view.svg"
                    width={20}
                    height={20}
                    onClick={() => handleView(row)}
                  />
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
    ];

    return columnsList;
  }, [canView, canEdit, canDelete, handleEdit, handleView, handleDelete]);


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
      `/pages/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize}&search=${inputQuery}&type=${router.slug}`,
      {},
      "get"
    );

    const fetchedData = response.data.map((item: any) => ({
      id: item._id,
      uniqId: item.uniqId,
      title: item.title,
      author: item.author,
      categories: item.categories,
      tag: item.tag,
    }));
    setData(fetchedData);
  };

  useEffect(() => {
    asyncHandler(fetchData)();
  }, [pagination.pageIndex, pagination.pageSize, inputQuery]);
  return (
    <>
      <Navigation profile={`${titleNav}`}
        user01="/images/user01.svg"
        bell01="/images/bell01.svg" />
      <div className="main">
        <Button
          text="Add New"
          link={`${pathname}/view/create-${cleanedPathname}`}
          className={`mb-4 ${styles.btnStyle}`}
        />

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
      </div></>
  );
};

export default Page;