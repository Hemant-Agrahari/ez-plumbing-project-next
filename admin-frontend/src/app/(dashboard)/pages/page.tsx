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
import { options } from "@/utils/tablePagination";
import { toast } from "react-toastify";

const Page = () => {
  const [data, setData] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState<any>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [paginationT, setPaginationT] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 1000,
  });
  const router = useParams();
  const { canView, canAdd, canEdit, canDelete } = usePermissions(
    `${router.slug}`
  );
  const pathname = usePathname();
  // const cleanedPathname = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const Router = useRouter();
  const handleEdit = (row: any) => {
    Router.push(
      `/pages/edit?pageId=${row.original.id}&template=${row.original.template}`
    );
  };
  const handleView = (row: any) => {
    Router.push(
      `/pages/preview/preview?pageId=${row.original.id}&template=${row.original.template}`
    );
  };
  const handleDelete = async (row: any) => {
    const rowId = row.original.id;
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this page?"
    );
    if (!isConfirmed) {
      return;
    }
    let apiUrl;
    switch (template) {
      case "about_us":
        apiUrl = `/deleteAboutUs?aboutId=${rowId}`;
        break;
      case "become_provider":
        apiUrl = `/deleteBecomeAProvider?becomeAProviderId=${rowId}`;
        break;
      case "blog_template":
        apiUrl = `/blog/delete?blogDataId=${rowId}`;
        break;
      case "author":
        apiUrl = `/author/delete?authorId=${rowId}`;
        break;
      case "locations":
        apiUrl = `/deleteLocation?locationId=${rowId}`;
        break;
      case "services":
        apiUrl = `/deleteService?serviceId=${rowId}`;
        break;
      case "services_1":
        apiUrl = `/deleteService?serviceId=${rowId}`;
        break;
      case "services_2":
        apiUrl = `/deleteService?serviceId=${rowId}`;
        break;
      case "services_3":
        apiUrl = `/deleteService?serviceId=${rowId}`;
        break;
      case "services_4":
        apiUrl = `/deleteService?serviceId=${rowId}`;
        break;
      case "services_5":
        apiUrl = `/deleteService?serviceId=${rowId}`;
        break;
      case "services_6":
        apiUrl = `/deleteService?serviceId=${rowId}`;
        break;
      case "services_7":
        apiUrl = `/deleteService?serviceId=${rowId}`;
        break;
      case "services_8":
        apiUrl = `/deleteService?serviceId=${rowId}`;
        break;
      case "services_9":
        apiUrl = `/deleteService?serviceId=${rowId}`;
        break;
      case "services_10":
        apiUrl = `/deleteService?serviceId=${rowId}`;
        break;
      case "services_11":
        apiUrl = `/deleteService?serviceId=${rowId}`;
        break;
      case "services_12":
        apiUrl = `/deleteService?serviceId=${rowId}`;
        break;
      case "services_13":
        apiUrl = `/deleteService?serviceId=${rowId}`;
        break;
      case "scholarship_program":
        // apiUrl = `/deleteService?serviceId=${rowId}`;
        // break;
        apiUrl = `/scholarship/delete?scholarshipId=${rowId}`;
        break;
      default:
        apiUrl = `/pages/delete?pageId=${rowId}`;
        break;
    }

    try {
      const response = await requestHandler(apiUrl, {}, "get");

      if (response.status === 200) {
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
    let apiUrl = "";
    switch (template) {
      case "blog_template":
        apiUrl = `/blog/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${
          pagination.pageSize
        }&search=${inputQuery}`;
        break;
      case "author":
        apiUrl = `/author/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${
          pagination.pageSize
        }&search=${inputQuery}`;
        break;
      case "become_provider":
        apiUrl = `/listBecomeAProvider?pageIndex=${
          pagination.pageIndex + 1
        }&pageSize=${pagination.pageSize}&search=${inputQuery}`;
        break;
      case "locations":
        apiUrl = `/listLocation?pageIndex=${
          pagination.pageIndex + 1
        }&pageSize=${pagination.pageSize}&search=${inputQuery}`;
        break;
      case "about_us":
        apiUrl = `/listAboutUs?pageIndex=${pagination.pageIndex + 1}&pageSize=${
          pagination.pageSize
        }&search=${inputQuery}`;
        break;
      case "services":
        apiUrl = `/listService?pageIndex=${pagination.pageIndex + 1}&pageSize=${
          pagination.pageSize
        }&search=${inputQuery}`;
        break;
      // case "services":
      //   apiUrl = `/listService?serviceType=services&pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize}&search=${inputQuery}`;
      //   break;
      case "services_1":
        apiUrl = `/listService?serviceType=services_1&pageIndex=${
          pagination.pageIndex + 1
        }&pageSize=${pagination.pageSize}&search=${inputQuery}`;
        break;
      case "services_2":
        apiUrl = `/listService?serviceType=services_2&pageIndex=${
          pagination.pageIndex + 1
        }&pageSize=${pagination.pageSize}&search=${inputQuery}`;
        break;
      case "services_3":
        apiUrl = `/listService?serviceType=services_3&pageIndex=${
          pagination.pageIndex + 1
        }&pageSize=${pagination.pageSize}&search=${inputQuery}`;
        break;
      case "services_4":
        apiUrl = `/listService?serviceType=services_4&pageIndex=${
          pagination.pageIndex + 1
        }&pageSize=${pagination.pageSize}&search=${inputQuery}`;
        break;
      case "services_5":
        apiUrl = `/listService?serviceType=services_5&pageIndex=${
          pagination.pageIndex + 1
        }&pageSize=${pagination.pageSize}&search=${inputQuery}`;
        break;
      case "services_6":
        apiUrl = `/listService?serviceType=services_6&pageIndex=${
          pagination.pageIndex + 1
        }&pageSize=${pagination.pageSize}&search=${inputQuery}`;
        break;
      case "services_7":
        apiUrl = `/listService?serviceType=services_7&pageIndex=${
          pagination.pageIndex + 1
        }&pageSize=${pagination.pageSize}&search=${inputQuery}`;
        break;
      case "services_8":
        apiUrl = `/listService?serviceType=services_8&pageIndex=${
          pagination.pageIndex + 1
        }&pageSize=${pagination.pageSize}&search=${inputQuery}`;
        break;
      case "services_9":
        apiUrl = `/listService?serviceType=services_9&pageIndex=${
          pagination.pageIndex + 1
        }&pageSize=${pagination.pageSize}&search=${inputQuery}`;
        break;
      case "services_10":
        apiUrl = `/listService?serviceType=services_10&pageIndex=${
          pagination.pageIndex + 1
        }&pageSize=${pagination.pageSize}&search=${inputQuery}`;
        break;
      case "services_11":
        apiUrl = `/listService?serviceType=services_11&pageIndex=${
          pagination.pageIndex + 1
        }&pageSize=${pagination.pageSize}&search=${inputQuery}`;
        break;
      case "services_12":
        apiUrl = `/listService?serviceType=services_12&pageIndex=${
          pagination.pageIndex + 1
        }&pageSize=${pagination.pageSize}&search=${inputQuery}`;
        break;
      case "services_13":
        apiUrl = `/listService?serviceType=services_13&pageIndex=${
          pagination.pageIndex + 1
        }&pageSize=${pagination.pageSize}&search=${inputQuery}`;
        break;
      // apiUrl = `/listService?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize}&search=${inputQuery}`;
      case "scholarship_program":
        apiUrl = `/scholarship/list?pageIndex=${
          pagination.pageIndex + 1
        }&pageSize=${pagination.pageSize}&search=${inputQuery}`;
        break;
      default:
        apiUrl = "";
        break;
    }

    if (apiUrl) {
      const response = await requestHandler(apiUrl, {}, "get");
      const fetchedData = response.data.map((item: any) => ({
        id: item._id,
        uniqId: item.uniqId,
        bannerTitle: item.bannerTitle,
        slug: item.slug,
        template: item.template,
        tag: item.tag,
      }));

      setData(fetchedData);
    }
    const templateResponse = await requestHandler(
      `/template/list?pageIndex=${paginationT.pageIndex + 1}&pageSize=${
        paginationT.pageSize
      }`,
      {},
      "get"
    );

    const fetchedTemplates = templateResponse.data.map((item: any) => ({
      id: item.id,
      label: item.title,
      value: item.key,
    }));
    if (fetchedTemplates) {
      const excludedTemplates = [
        "services_1",
        "services_2",
        "services_3",
        "services_4",
        "services_5",
        "services_6",
        "services_7",
        "services_8",
        "services_9",
        "services_10",
        "services_11",
        "services_12",
        "services_13",
        "scholarship_program",
        "become_provider",
      ];
      const filteredTemplates = fetchedTemplates.filter(
        (template: any) => !excludedTemplates.includes(template.value)
      );
      // console.log(filteredTemplates);

      setTemplates(filteredTemplates);
    }
  };
  const handleTemplateChange = (e: any) => {
    // console.log(e.target.value);
    setTemplate(e.target.value);
    setTemplates(templates);
  };
  const columns = useMemo(() => {
    const showActionsColumn = canView || canEdit || canDelete;

    const columnsList = [
      {
        accessorKey: "id",
        header: "#",
        size: 100,
      },
      {
        accessorKey: "bannerTitle",
        header: "Title",
        size: 100,
      },
      {
        accessorKey: "slug",
        header: "slug",
        size: 100,
      },
      {
        accessorKey: "template",
        header: "Template",
        size: 100,
      },
      ...(showActionsColumn
        ? [
            {
              id: "actions",
              header: "Action",
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
            },
          ]
        : []),
    ];

    return columnsList;
  }, [canView, canEdit, canDelete, handleEdit, handleView, handleDelete]);
  useEffect(() => {
    asyncHandler(fetchData)();
  }, [pagination.pageIndex, pagination.pageSize, inputQuery, template]);
  return (
    <>
      <Navigation
        profile={`Pages`}
        user01="/images/user01.svg"
        bell01="/images/bell01.svg"
      />
      <div className="main">
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          {/* <HtmlDropdown
            className={styles.designOption}
            options={templates}
            onChange={handleTemplateChange}
            value={template}
            placeholder="Select a Template"
          /> */}

          <Button
            text="Add New"
            link={`pages/create-page`}
            className={`mb-4 ${styles.btnStyle}`}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <div className={styles.SearchField}>
            <HtmlDropdown
              className={styles.designOption}
              options={templates}
              onChange={handleTemplateChange}
              value={template}
              placeholder="Select a Template"
            />
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
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handlePageSizeChange(String(e.target.value))
              }
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
