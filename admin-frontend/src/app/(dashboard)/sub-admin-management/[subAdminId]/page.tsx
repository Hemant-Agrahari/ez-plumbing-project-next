"use client";
import React, { useMemo, useEffect, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import type { NextPage } from 'next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './page.module.css';
import DynamicTable from '@/components/UI/Table';
import Button from '@/components/UI/Button';
import DynamicInput from '@/components/UI/Input';
import { requestHandler } from '@/helper/requestHandler';
import { asyncHandler } from '@/utils/asyncHandler';
import { toast } from 'react-toastify';
import { useSearchParams, usePathname } from 'next/navigation';
import Navigation from '@/components/Layout/Navigation/Navigation';
import HtmlDropdown from '@/components/UI/HtmlDropdown';
import { initialPermissions, ModulePermissions } from '@/utils/sidebar/modulesList';

const AddNewSubAdmin: NextPage = () => {
  const [data, setData] = useState<ModulePermissions[]>(initialPermissions);
  const [viewMode, setViewMode] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 20,
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const subAdminId = searchParams.get("subAdminId");

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      status: "inactive",
      profile: null as File | null,
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("password", values.password);
      formData.append("status", values.status);
      if (values.profile) {
        formData.append("profile", values.profile);
      }
      const serializedPermissions = JSON.stringify(
        data.map(({ moduleName, moduleValue, ...rest }) => ({
          moduleName,
          moduleValue,
          ...rest,
        }))
      );
      formData.append("permission", serializedPermissions);

      await asyncHandler(async () => {
        const endpoint = subAdminId ? `/subadmin/edit?subAdminId=${subAdminId}` : `/subadmin/add`;
        const response = await requestHandler(endpoint, formData, 'post');
        toast.success(response.message || 'Data added successfully');
        if (response.status===200 && !subAdminId) {
          formik.resetForm();
          setImagePreview(null);
          setData(initialPermissions);
        }

      })();
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      formik.setFieldValue("profile", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchPermissionsData = async () => {
    await asyncHandler(async () => {
      const response = await requestHandler(
        "/pages/list?pageIndex=1&pageSize=10&search=&type=pages",
        {},
        "get"
      );
      const pagesData = response.data;

      const permissions = pagesData.map((page: { title: string, slug: string }) => ({
        moduleName: page.title,
        moduleSlug: page.slug,
        moduleValue: false,
        view: false,
        edit: false,
        add: false,
        delete: false,
      }));
      // console.log("data",data);
      // console.log("initialPermissions",initialPermissions);
      // console.log("permissions",permissions);

      setData([...initialPermissions, ...permissions]);
    })();
  };

  const fetchSubAdminData = async () => {
    if (subAdminId) {
      await asyncHandler(async () => {
        const response = await requestHandler(`/subadmin/view?subAdminId=${subAdminId}`, {}, 'get');
        const subAdminData: any = response.data;

        formik.setValues({
          name: subAdminData.name,
          email: subAdminData.email,
          mobile: subAdminData.mobile,
          password: subAdminData.password,
          status: subAdminData.status,
          profile: null,
        });
        setImagePreview(subAdminData.profile);

        const permissionsResponse = await requestHandler('/pages/list?pageIndex=1&pageSize=20&search=&type=pages', {}, 'get');

        const pagesData = permissionsResponse.data;
        // console.log(pagesData, "pagesData");

        const subAdminModuleNames = new Set(subAdminData.permission.map((perm: ModulePermissions) => perm.moduleName));

        const updatedPermissions = pagesData
          .map((page: { title: string, slug: string }) => ({
            moduleName: page.title,
            moduleSlug: page.slug,
            moduleValue: false,
            view: false,
            edit: false,
            add: false,
            delete: false,
          }))
        const existingModuleNames = new Set(subAdminData.permission.map((item: any) => item.moduleName));
        const filteredUpdatedPermissions = updatedPermissions.filter(
          (item: any) => !existingModuleNames.has(item.moduleName)
        );
        const combinedData = [...subAdminData.permission, ...filteredUpdatedPermissions];
        setData(combinedData);
        // console.log(combinedData, "combinedData");

      })();
    }
  };

  useEffect(() => {
    if (pathname.includes("view")) {
      setViewMode(true);
    }
    fetchPermissionsData();
    fetchSubAdminData();
  }, [subAdminId]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "moduleName",
        header: "Module Name",
        size: 50,
        Cell: ({ row }: any) => (
          <>
            <label>
              <input
                className={styles.tableCheckbox}
                type="checkbox"
                checked={row.original.moduleValue}
                onChange={() => handleCheckboxChange(row.index, "moduleValue")}
                disabled={viewMode}
              />
            </label>
            <span className="mx-3">{row.original.moduleName}</span>
          </>
        ),
      },
      {
        accessorKey: "view",
        header: "View",
        size: 50,
        Cell: ({ row }: any) => (
          <input
            className={styles.tableCheckbox}
            type="checkbox"
            checked={row.original.view}
            onChange={() => handleCheckboxChange(row.index, "view")}
            disabled={viewMode}
          />
        ),
      },
      {
        accessorKey: "edit",
        header: "Edit",
        size: 50,
        Cell: ({ row }: any) => (
          <input
            className={styles.tableCheckbox}
            type="checkbox"
            checked={row.original.edit}
            onChange={() => handleCheckboxChange(row.index, "edit")}
            disabled={viewMode}
          />
        ),
      },
      {
        accessorKey: "add",
        header: "Add",
        size: 50,
        Cell: ({ row }: any) => (
          <input
            className={styles.tableCheckbox}
            type="checkbox"
            checked={row.original.add}
            onChange={() => handleCheckboxChange(row.index, "add")}
            disabled={viewMode}
          />
        ),
      },
      {
        accessorKey: "delete",
        header: "Delete",
        size: 50,
        Cell: ({ row }: any) => (
          <input
            className={styles.tableCheckbox}
            type="checkbox"
            checked={row.original.delete}
            onChange={() => handleCheckboxChange(row.index, "delete")}
            disabled={viewMode}
          />
        ),
      },
    ],
    [data, pathname]
  );

  const handleCheckboxChange = (index: number, key: keyof ModulePermissions) => {
    if (viewMode) return;

    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      [key]: !updatedData[index][key],
    };
    setData(updatedData);
  };

  return (
    <>
      <Navigation
        profile={
          subAdminId
            ? viewMode
              ? "View Sub Admin Details"
              : "Edit Sub Admin Details"
            : "Add Sub Admin Details"
        }
        user01="/images/user01.svg"
        bell01="/images/bell01.svg"
      />
      <div className="mx-4">
        <div className="main w-100">
          <h2 className={styles.personalTitle}>Personal Information</h2>
          <div className={styles.PersonalInformationContainer}>
            <div className={styles.imageBox}>
              <div className={styles.UserImageWrapper}>
                <img
                  src={imagePreview || "/images/user-image.png"}
                  width="237"
                  height="237"
                  alt="User"
                />

              </div>
              <img
                src="/images/editImage.svg"
                width="48"
                height="48"
                alt="User"
                className={styles.editImageBtn}
                onClick={() => document.getElementById("fileInput")?.click()}
              />
            </div>
            <div className={styles.UploadButtonContainer}>
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              {/* <Button text="Upload Image" className={styles.uploadButton} handle={() => document.getElementById('fileInput')?.click()} /> */}
            </div>
            <form className={styles.UserContactDetails}>
              <div className={styles.InputGroup}>
                <div className={styles.InputLabel}>Sub Admin Name</div>
                <DynamicInput
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className={styles.w100}
                />
              </div>
              <div className={styles.InputGroup}>
                <div className={styles.InputLabel}>Mobile Number</div>
                <DynamicInput
                  type="text"
                  name="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  className={styles.w100}
                />
              </div>
              <div className={styles.InputGroup}>
                <div className={styles.InputLabel}>Email</div>
                <DynamicInput
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={styles.w100}
                />
              </div>
              <div className={styles.InputGroup}>
                <div className={styles.InputLabel}>Password</div>
                <DynamicInput
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className={styles.w100}
                />
              </div>
              <div className={styles.InputGroup}>
                <div className={styles.InputLabel}>Status</div>
                <HtmlDropdown
                  name="status"
                  options={[
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                  ]}
                  value={formik.values.status}
                  onChange={(e) => formik.setFieldValue("status", e.target.value)}
                  className={styles.designOption}
                />
              </div>
            </form>
          </div>
          <h2 className={styles.personalTitle}>Permissions</h2>

          <DynamicTable columns={columns} data={data} pagination={pagination}
            setPagination={setPagination} />
          {!viewMode &&
            <Button text="Submit" className={`${styles.uploadButton} mt-5`} handle={formik.handleSubmit} />}
        </div>
      </div>
    </>
  );
};

export default AddNewSubAdmin;


// [{"moduleName":"Template Management","moduleValue":true,"view":true,"edit":false,"add":false,"delete":false}]