"use client";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import styles from "./page.module.css";
import DynamicInput from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import DynamicSearch from "@/components/UI/Search";
import { HiDotsVertical } from "react-icons/hi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { MRT_PaginationState } from "material-react-table";
import { requestHandler } from "@/helper/requestHandler";
import NotificationModal from "@/components/UI/Modal/Notification/Notification";
import { asyncHandler } from "@/utils/asyncHandler";
import Navigation from "@/components/Layout/Navigation/Navigation";
import TimeAgo from "@/components/UI/TimeAgo";
import { usePathname } from "next/navigation";
import { usePermissions } from "@/hooks/usePermissions";
import { API_URL } from "@/helper/constant";

interface NotificationData {
  id: number;
  updatedBy: {
    profile: string;
    name: string;
    updatedAt: string;
  };
  updatedAt: string;
  message: string;
}

const Notification: NextPage = () => {
  const [show, setShow] = useState(false);
  const [notificationId, setNotificationId] = useState<number | null>(null);
  const [data, setData] = useState<NotificationData[]>([]);
  const [inputQuery, setInputQuery] = useState({
    search: "",
    startDate: new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  });
  const pathname = usePathname();
  const cleanedPathname = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const { canDelete } = usePermissions(`${cleanedPathname}`);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    asyncHandler(async () => {
      const queryParams = [];
      if (inputQuery?.search) {
        queryParams.push(`search=${encodeURIComponent(inputQuery.search)}`);
      }
      if (inputQuery?.startDate) {
        queryParams.push(
          `fromDate=${encodeURIComponent(inputQuery.startDate)}`
        );
      }
      if (inputQuery?.endDate) {
        queryParams.push(`toDate=${encodeURIComponent(inputQuery.endDate)}`);
      }
      queryParams.push(`pageIndex=${pagination.pageIndex + 1}`);
      queryParams.push(`pageSize=${pagination.pageSize}`);
      const queryString = queryParams.join("&");
      const response = await requestHandler(
        `/notification/list?${queryString}`,
        {},
        "get"
      );

      setData(response.data);
      setTotalPages(response.pagination.totalPages);
    })();
  }, [pagination.pageIndex, pagination.pageSize, inputQuery]);

  const handleShowModal = (id: number) => {
    setNotificationId(id);
    setShow(true);
  };

  const handleDelete = (id: number) => {
    setData((prevData) =>
      prevData.filter((notification) => notification.id !== id)
    );
  };

  const handlePageChange = (newPageIndex: number) => {
    setPagination((prev) => ({ ...prev, pageIndex: newPageIndex }));
  };
  return (
    <>
      <Navigation
        profile="Notifications"
        user01="/images/user01.svg"
        bell01="/images/bell01.svg"
      />
      <div className="main w-100">
        <div className={styles.DateField}>
          <DynamicInput
            type="date"
            placeholder="From"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputQuery((prev) => ({ ...prev, startDate: e.target.value }));
            }}
            value={inputQuery.startDate}
          />
          <DynamicInput
            type="date"
            placeholder="To"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputQuery((prev) => ({ ...prev, endDate: e.target.value }));
            }}
            value={inputQuery.endDate}
          />
        </div>
        <div className={styles.SearchField}>
          <DynamicSearch
            type="search"
            placeholder="Search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputQuery((prev) => ({ ...prev, search: e.target.value }));
            }}
          />
          <Button text="Search" type="submit" className={styles.BtnBlue} />
        </div>
        <div className={styles.NotificationField}>
          {data?.map((data, index) => {
            return (
              <div className={styles.NotificationCard} key={index}>
                <div className={styles.LeftContents}>
                  <div className={styles.ImageWrapper}>
                    <img
                      src={`${API_URL}${data.updatedBy.profile}`}
                      alt=""
                    />
                  </div>
                  <div className={styles.TextBtnWrapper}>
                    <span>
                      {data.message} {data.updatedBy.name}
                    </span>
                    <Button
                      type="button"
                      text="View Blog"
                      className={styles.OutlineButton}
                    />
                  </div>
                </div>
                <div className={styles.RightContents}>
                  <span className={styles.clockTimeText}>
                    <img
                      src="/images/clock.png"
                      alt="clock"
                      width="30"
                      height="30"
                    />
                    <span className={styles.ActiveTime}>
                      <TimeAgo timestamp={data.updatedAt} />
                    </span>
                  </span>
                  {canDelete &&
                    <Button
                      text={<HiDotsVertical />}
                      handle={() => handleShowModal(data.id)}
                    />
                  }
                </div>
              </div>
            );
          })}
          {totalPages >= 1 ? (
            <ul className={styles.Pagination}>
              <li
                onClick={() =>
                  handlePageChange(Math.max(0, pagination.pageIndex - 1))
                }
                className={styles.ArrowButtons}
              >
                <MdKeyboardArrowLeft />
              </li>
              {Array.from({ length: totalPages }, (_, index) => index).map(
                (page) => (
                  <li
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`${styles.PaginationList} ${page === pagination.pageIndex
                      ? styles.ActivePagination
                      : ""
                      }`}
                  >
                    {page + 1}
                  </li>
                )
              )}
              <li
                onClick={() =>
                  handlePageChange(
                    Math.min(totalPages - 1, pagination.pageIndex + 1)
                  )
                }
                className={styles.ArrowButtons}
              >
                <MdKeyboardArrowRight />
              </li>
            </ul>
          ) : null}
        </div>
        <NotificationModal
          show={show}
          setShow={setShow}
          notificationId={notificationId}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default Notification;
