import React, { useEffect, useRef, useState } from "react";
import {
  WrapperContentTime,
  WrapperHeader,
  WrapperRadio,
  WrapperTime,
} from "./style";
import { Button, DatePicker, Form, Space } from "antd";
import {
  PlusCircleTwoTone,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import InputFormComponents from "../InputFormComponents/InputFormComponents";
import ButtonComponents from "../ButtonComponents/ButtonComponents";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as EventService from "../../services/EventService";
import * as mes from "../../components/Message/Message";
import TableComponent from "../TableComponents/TableComponent";
import InputComponents from "../InputComponents/InputComponents";
import { useQuery } from "@tanstack/react-query";
import ModalComponents from "../ModalComponents/ModalComponents";
import Loading from "../LoadingComponents/Loading";
const EventAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [discount, setDiscount] = useState("");
  const [eventName, setEventName] = useState("");

  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const searchInput = useRef(null);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const [form] = Form.useForm();

  const mutation = useMutationHooks((data) => {
    const { days, hours, minutes, seconds, eventName, discount } = data;
    const res = EventService.createEvent({
      days,
      hours,
      minutes,
      seconds,
      eventName,
      discount,
    });
    return res;
  });
  const mutationUpdate = useMutationHooks((data) => {
    const { id, days, hours, minutes, seconds, eventName, discount } = data;
    const res = EventService.UpdateEvent(id, {
      days,
      hours,
      minutes,
      seconds,
      eventName,
      discount,
    });
    return res;
  });
  const mutationDelete = useMutationHooks((data) => {
    const { id } = data;
    const res = EventService.deleteEvent(id);
    return res;
  });
  const fetchEventById = async (rowSelected) => {
    const res = await EventService.getEventById(rowSelected);
    if (res?.data) {
      setEventName(res?.data?.eventName);
      setDays(res?.data?.days);
      setHours(res?.data?.hours);
      setMinutes(res?.data?.minutes);
      setSeconds(res?.data?.seconds);
      setDiscount(res?.data?.discount);
    }
  };

  const handleOnChangeDay = (value) => {
    setDays(value);
  };
  const handleOnChangeHour = (value) => {
    setHours(value);
  };
  const handleOnChangeMinute = (value) => {
    setMinutes(value);
  };
  const handleOnChangeSecond = (value) => {
    setSeconds(value);
  };
  const handleOnChangeEvent = (value) => {
    setEventName(value);
  };
  const handleOnChangeDiscount = (value) => {
    setDiscount(value);
  };

  const handleCreatEvent = () => {
    mutation.mutate({
      days: `${days?.$d}`.slice(0, 15),
      hours,
      minutes,
      seconds,
      eventName,
      discount,
    });
  };
  const handleUpdateEvent = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        days: `${days?.$d}`.slice(0, 15),
        hours,
        minutes,
        seconds,
        eventName,
        discount,
      },
      {
        onSettled: () => {
          queryEvent.refetch();
        },
      }
    );
  };
  const handleDeleteEvent = () => {
    mutationDelete.mutate(
      { id: rowSelected },
      {
        onSettled: () => {
          queryEvent.refetch();
        },
      }
    );
  };

  // const mutationDelete = useMutationHooks(
  //     (data) => {
  //         const {
  //             id,
  //             token } = data
  //         const res = UserService.deleteUser(
  //             id,
  //             token)
  //         return res
  //     },
  // )

  const getAllEvent = async () => {
    const res = await EventService.getAllEvent();
    return res;
  };
  // useEffect(() => {
  //     form.setFieldsValue(stateUserDetails)
  // }, [form, stateUserDetails])

  useEffect(() => {
    if (rowSelected && isModalOpenUpdate) {
      fetchEventById(rowSelected);
    }
  }, [rowSelected, isModalOpenUpdate]);

  const handleOnclickCreatEvent = () => {
    setIsModalOpen(true);
    setIsModalOpenUpdate(false);
  };
  const handleOnclickUpdateEvent = () => {
    setIsModalOpenUpdate(true);
    setIsModalOpen(false);
  };

  const { data, isPending, isSuccess, isError } = mutation;
  const {
    data: dataUpdated,
    isPending: isPendingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isPending: isPendingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDelete;

  const queryEvent = useQuery({
    queryKey: ["allEvent"],
    queryFn: getAllEvent,
  });

  const { isLoading: isPendingEvent, data: event } = queryEvent;

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={handleOnclickUpdateEvent}
        />
      </div>
    );
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponents
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={`${selectedKeys[0] || ""}`}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Tên sự kiện",
      dataIndex: "eventName",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.eventName.length - b.eventName.length,
      ...getColumnSearchProps("eventName"),
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      sorter: (a, b) => a.discount - b.discount,
      ...getColumnSearchProps("discount"),
    },
    {
      title: "Ngày-tháng-năm",
      dataIndex: "days",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.days.length - b.days.length,
      ...getColumnSearchProps("days"),
    },

    {
      title: "Giờ",
      dataIndex: "hours",
      sorter: (a, b) => a.hours - b.hours,
      ...getColumnSearchProps("hours"),
    },
    {
      title: "Phút",
      dataIndex: "minutes",
      sorter: (a, b) => a.minutes - b.minutes,
      ...getColumnSearchProps("minutes"),
    },
    {
      title: "Giây",
      dataIndex: "seconds",
      sorter: (a, b) => a.seconds - b.seconds,
      ...getColumnSearchProps("seconds"),
    },

    {
      title: "Hành động",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    event?.data?.length &&
    event?.data?.map((event) => {
      return {
        ...event,
        key: event._id,
      };
    });

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      setIsModalOpen(false);
      mes.success("Tạo sự kiện thành công!");
    } else if (isError) {
      mes.error("Tạo sự kiện thất bại!");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      mes.success("Xóa sự kiện thành công!");
      handleCancelDelete();
    } else if (isErrorDeleted) {
      mes.error("Xóa sự kiện thất bại!");
    }
  }, [isSuccessDeleted]);

  const handleCloseDrawer = () => {
    setIsModalOpenUpdate(false);
    setEventName("");
    setDays("");
    setHours("");
    setMinutes("");
    setSeconds("");
    setDiscount("");
  };
  // const handleCancelDelete = () => {
  //     setIsModalOpenDelete(false);
  // };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      mes.success("Cập nhật sự kiện thành công!");
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      mes.error("Cập nhật sự kiện thất bại!");
    }
  }, [isSuccessUpdated]);
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  return (
    <div>
      <WrapperHeader style={{ fontSize: "20px", textAlign: "center" }}>
        SỰ KIỆN GIẢM GIÁ
      </WrapperHeader>
      <WrapperContentTime>
        <div style={{ marginTop: "10px" }}>
          <Button
            style={{
              height: "150px",
              width: "150px",
              borderRadius: "6px",
              borderStyle: "dashed",
            }}
            onClick={handleOnclickCreatEvent}
          >
            <PlusCircleTwoTone style={{ fontSize: "40px" }} />
          </Button>
        </div>
        {isModalOpen === true ? (
          <div>
            <WrapperContentTime>
              <DatePicker onChange={handleOnChangeDay} />
              <InputFormComponents
                id="hours"
                style={{ width: "148px", height: "31.6px" }}
                placeholder="Nhập giờ"
                onChange={handleOnChangeHour}
              />
              <InputFormComponents
                id="minutes"
                style={{ width: "148px", height: "31.6px" }}
                placeholder="Nhập phút"
                onChange={handleOnChangeMinute}
              />
              <InputFormComponents
                id="seconds"
                style={{ width: "148px", height: "31.6px" }}
                placeholder="Nhập giây"
                onChange={handleOnChangeSecond}
              />
              <ButtonComponents
                onClick={handleCreatEvent}
                size={20}
                styleButton={{
                  height: "30px",
                  width: "fit-content",
                  borderRadius: "4px",
                  padding: "2px 6px 6px",
                  background: "#5774F8",
                }}
                textbutton={"Tạo sự kiện"}
                styletextbutton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              />
            </WrapperContentTime>
            <WrapperContentTime>
              <InputFormComponents
                id="event"
                style={{ width: "485px", height: "40px" }}
                placeholder="Nhập nội dung sự kiện"
                onChange={handleOnChangeEvent}
              />
              <InputFormComponents
                id="discount"
                style={{ width: "148px", height: "40px" }}
                placeholder="Giảm giá (%)"
                onChange={handleOnChangeDiscount}
              />
            </WrapperContentTime>
            <WrapperContentTime></WrapperContentTime>
          </div>
        ) : (
          <div></div>
        )}
        {isModalOpenUpdate === true ? (
          <div>
            <WrapperContentTime>
              <DatePicker placeholder={days} onChange={handleOnChangeDay} />
              <InputFormComponents
                id="hours"
                style={{ width: "148px", height: "31.6px" }}
                value={hours}
                onChange={handleOnChangeHour}
              />
              <InputFormComponents
                id="minutes"
                style={{ width: "148px", height: "31.6px" }}
                value={minutes}
                onChange={handleOnChangeMinute}
              />
              <InputFormComponents
                id="seconds"
                style={{ width: "148px", height: "31.6px" }}
                value={seconds}
                onChange={handleOnChangeSecond}
              />
              <ButtonComponents
                onClick={handleUpdateEvent}
                size={20}
                styleButton={{
                  height: "30px",
                  width: "fit-content",
                  borderRadius: "4px",
                  padding: "2px 6px 6px",
                  background: "#5774F8",
                }}
                textbutton={"Cập nhật"}
                styletextbutton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              />
            </WrapperContentTime>
            <WrapperContentTime>
              <InputFormComponents
                id="event"
                style={{ width: "485px", height: "40px" }}
                value={eventName}
                onChange={handleOnChangeEvent}
              />
              <InputFormComponents
                id="discount"
                style={{ width: "148px", height: "40px" }}
                value={discount}
                onChange={handleOnChangeDiscount}
              />
            </WrapperContentTime>
            <WrapperContentTime></WrapperContentTime>
          </div>
        ) : (
          <div></div>
        )}
      </WrapperContentTime>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <ModalComponents
        title="Xóa người sự kiện"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteEvent}
      >
        <Loading isPending={isPendingDeleted}>
          <div>Bạn có muốn xóa sự kiện này không?</div>
        </Loading>
      </ModalComponents>
    </div>
  );
};

export default EventAdmin;
