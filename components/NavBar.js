'use client'
import { Fragment, use, useEffect, useState } from "react";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import IntroModal from "./IntroModal";
import { useSession } from "next-auth/react";
import { Protect, useUser } from "@clerk/nextjs";


const navigation = [
  { name: "Home", href: "/cancer-type/chromophobe", current: false, version: "patient" },
  {
    name: "Research / Management",
    href: "/research",
    current: false,
    version: "mrcresearch",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar({
  version,
  setVersion,
  isEditing,
  setIsEditing,
}) {
  const router = useRouter();
  const [filteredNav, setFilteredNav] = useState(navigation);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { user } = useUser();

  // Get primary email address
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const isAdmin = userEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    if (!hasVisitedBefore && !router.asPath.includes('/login')) {
      setIsIntroModalOpen(true);
      localStorage.setItem("hasVisitedBefore", "true");
    } else {
      if (localStorage.getItem("version") === "mrcresearch") {
        localStorage.setItem("version", "mrcresearch");
        setVersion("mrcresearch");
      } else {
        localStorage.setItem("version", "patient");
        setVersion("patient");
        router.push("/cancer-type/chromophobe");
      }
    }

    if (localStorage.getItem("version") === "mrcresearch") {
      setFilteredNav(navigation);
    } else {
      setFilteredNav(navigation.filter((item) => item.version === "patient"));
    }
  }, [setVersion, version]);

  useEffect(() => {
    setIsClient(true);
    if (localStorage.getItem("adminMode") === "true") {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [setIsEditing, isEditing]);

  if (!isClient) {
    return null;
  }


  const closeIntroModal = () => {
    setIsIntroModalOpen(false);
  };

  const toggleResearchSwitch = () => {
    //if the verison is currently set to research, then we want to switch to patient
    if (localStorage.getItem("version") === "patient") {
      localStorage.setItem("version", "mrcresearch");
      setVersion("mrcresearch");
    } else {
      localStorage.setItem("version", "patient");
      setVersion("patient");
    }
  };

  const toggleAdmin = async () => {
    try {
      localStorage.setItem("adminMode", JSON.stringify(!isEditing));
      setIsEditing(!isEditing);
    } catch (error) {
      console.error('Error checking admin permissions:', error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 top-0 left-0 right-0 z-10">
      {({ open }) => (
        <>
          {isIntroModalOpen && !router.asPath.includes('/login') && (
            <IntroModal
              show={isIntroModalOpen}
              fragment={Fragment}
              closeModal={closeIntroModal}
              setVersion={setVersion}
            />
          )}
          <div className="mx-auto w-3/4 px-4 sm:px-6 lg:px-">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="md:hidden flex items-center">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden md:flex md:items-center md:space-x-4">
                  {filteredNav.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                  <Menu as="div" className="relative inline-block text-left">
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {navigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                  onClick={() => setVersion(item.version)}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                      <CogIcon className="h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <div>
                          <Menu.Item>
                            <div className="flex justify-between mt-3 mx-2 mb-4">
                              ``
                              <div className={"text-white px-2 self-center"}>
                                <span className={"capitalize"}>Research</span>
                              </div>
                              <Switch
                                checked={true}
                                onChange={toggleResearchSwitch}
                                className={classNames(
                                  version === "mrcresearch"
                                    ? "bg-blue-600"
                                    : "bg-gray-200",
                                  "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                )}
                              ></Switch>
                            </div>
                          </Menu.Item>
                        </div>
                        {isAdmin && (
                          <div>
                            <Menu.Item>
                              <div className="flex justify-between mt-3 mx-2 mb-4">
                                ``
                                <div className={"text-white px-2 self-center"}>
                                  <span className={"capitalize"}>Admin</span>
                                </div>
                                <Switch
                                  checked={isEditing}
                                  onChange={toggleAdmin}
                                  className={classNames(
                                    isEditing ? "bg-blue-600" : "bg-gray-200",
                                    "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                  )}
                                ></Switch>
                              </div>
                            </Menu.Item>
                          </div>
                        )}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {isEditing ? (
            <div className="w-full bg-red-500 p-2 text-white text-center">
              Admin Mode Enabled
            </div>
          ) : null}

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {filteredNav.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
