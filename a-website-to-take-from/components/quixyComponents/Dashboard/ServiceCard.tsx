import { deleteService, updateUser } from "@/common/firebase/quixy";
import { setUser } from "@/common/redux/slices/user";
import { IProject } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Image from "next/image";
import { set_modals } from "@/common/redux/slices/modalsopen";
import ServiceOptionsOpened from "./ServiceOptionsOpened";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ProjectImages from "./ImageGenerator/dashboard/ProjectImages";
import { useState } from "react";
export default function ServiceCard({
  service,
  setEditOpen,
  setOpenedService,
  user,
}: {
  service: IProject;
  setEditOpen: any;
  setOpenedService: any;
  user: any;
}) {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { modals } = useSelector((state: any) => state.modals);
  const [isOpen, setIsOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false);

  const handleDeleteService = async (id: string) => {
    try {
      // Delete job offer from the collection
      await deleteService(id);

      // Update the user's job offers by removing the deleted one
      const updatedServices = user?.services?.filter(
        (service: any) => service.id !== id
      );

      // Update user in the database
      await updateUser(user.uid, { services: updatedServices });

      // Dispatch updated user state to Redux
      dispatch(
        setUser({
          ...user,
          services: updatedServices,
        })
      );

      toast.success("Pomyślnie usunięto usługę.");
      setOptionsOpen(false);
      setDeleteMenu(false);
    } catch (error) {
      toast.error("Przepraszamy! Wystąpił błąd.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };
  return (
    <>
      <div className="block p-6 bg-gray-800 hover:bg-zinc-800 rounded-md relative">
        <ServiceOptionsOpened
          setDeleteMenu={setDeleteMenu}
          deleteMenu={deleteMenu}
          optionsOpen={optionsOpen}
          setEditOpen={setEditOpen}
          setOptionsOpen={setOptionsOpen}
          handleDeleteService={handleDeleteService}
          service={service}
          setOpenedService={setOpenedService}
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <div>
            <div className="flex flex-wrap w-full justify-between">
              <h5 className="mb-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-blue-500">
                {service?.name}
              </h5>
              <div className="flex items-end justify-end">
                <button
                  onClick={() => setOptionsOpen(!optionsOpen)}
                  className={`absolute h-max top-3 right-3 w-max text-3xl text-white px-2 bg-gradient-to-r from-zinc-700 to-zinc-800 z-10 duration-200 rounded-md`}
                >
                  <HiOutlineDotsHorizontal
                    className={`${
                      optionsOpen
                        ? "scale-125 hover:scale-110"
                        : "hover:scale-90"
                    }`}
                  />
                </button>
              </div>
            </div>
            <p className="mb-2 text-white">
              <span className="text-sm font-bold text-white">Płatność:</span>{" "}
              {service?.time}
            </p>
            <p className="mb-2 text-white">
              <span className="text-sm font-bold text-white">Cena:</span>{" "}
              {service?.salaryValue}
            </p>
            <p className="mb-2 text-white">
              <span className="text-sm font-bold text-white">
                Czas wykonania:
              </span>{" "}
              {service?.duration}
            </p>
            <p className="text-white my-3 rounded-md">{service?.desc}</p>
            <div className="mt-2 gap-3 grid grid-cols-2 w-full">
              {service.images.map((image: any, i: any) => (
                <button
                  onClick={() => {
                    setCurrentIndex(i);
                    dispatch(set_modals({ ...modals, isserviceOpen: true }));
                    setIsOpen(true);
                  }}
                  key={i}
                  className="relative aspect-square w-full"
                >
                  <Image
                    src={image.src}
                    width={550}
                    height={550}
                    alt={image?.desc || "Obraz usługi"}
                    className="w-full h-full rounded-md absolute inset-0 object-cover group-hover:scale-110 duration-500"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed left-0 top-0 ${isOpen ? "block" : "hidden"} z-[9999]`}
      >
        <ProjectImages
          service={service}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
}
