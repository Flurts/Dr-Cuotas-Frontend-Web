'use client';
import { EventSourceInput } from '@fullcalendar/core/index';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {
  Draggable,
  DropArg,
} from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Fragment, useEffect, useState } from 'react';
import {
  AiFillCheckCircle,
  AiFillClockCircle,
  AiFillCloseCircle,
} from 'react-icons/ai';

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

export default function CalendarView() {
  const [events] = useState([
    { title: 'Pendiente', id: '1' },
    { title: 'Rechazado', id: '2' },
    { title: 'Aceptado', id: '3' },
  ]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    start: '',
    allDay: false,
    id: 0,
  });
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const draggableEl = document.getElementById('draggable-el');
    if (draggableEl) {
      // eslint-disable-next-line no-new
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          const title = eventEl.getAttribute('title');
          const id = eventEl.getAttribute('data');
          const start = eventEl.getAttribute('start');
          return { title, id, start };
        },
      });
    }
  }, []);

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime(),
    });
    setShowModal(true);
  }

  function addEvent(data: DropArg) {
    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime(),
    };
    setAllEvents([...allEvents, event]);
  }

  function handleDeleteModal(data: {
    event: { id: string; title: string; start: Date; allDay: boolean };
  }) {
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event.id));
    setSelectedEvent({
      id: Number(data.event.id),
      title: data.event.title,
      start: data.event.start,
      allDay: data.event.allDay,
    });
  }

  function handleDelete() {
    setAllEvents(
      allEvents.filter((event) => Number(event.id) !== Number(idToDelete)),
    );
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: 0,
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewEvent({
      ...newEvent,
      title: e.target.value,
    });
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAllEvents([...allEvents, newEvent]);
    setShowModal(false);
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: 0,
    });
  }

  function handleCloseEventDetailsModal() {
    setShowEventDetailsModal(false);
    setSelectedEvent(null);
  }

  function handleShowEventDetails() {
    setShowEventDetailsModal(true);
    setShowDeleteModal(false);
  }

  const { t } = useTranslation('common');

  return (
    <>
      <div className="flex flex-col items-center w-full h-full">
        <div className="w-full h-full flex flex-col xl:flex-row justify-between items-center mb-4 mt-4 gap-4">
          <h1 className="text-4xl font-bold text-center xl:text-justify text-[#7863f7] mx-16 w-full">
            {t('calendar.calendar')}
          </h1>
          <div className="w-full h-20 flex flex-row justify-center items-center gap-2">
            <button className="w-8 h-8 bg-[#B398F5] text-white rounded-full flex justify-center items-center hover:shadow-2xl hover:shadow-[#B398F5] hover:scale-105 transition-all duration-300">
              <AiFillClockCircle className="w-8 h-8" />
            </button>
            <button className="w-8 h-8 bg-[#B398F5] text-white rounded-full flex justify-center items-center hover:shadow-2xl hover:shadow-[#B398F5] hover:scale-105 transition-all duration-300">
              <AiFillCloseCircle className="w-8 h-8" />
            </button>
            <button className="w-8 h-8 bg-[#B398F5] text-white rounded-full flex justify-center items-center hover:shadow-2xl hover:shadow-[#B398F5] hover:scale-105 transition-all duration-300">
              <AiFillCheckCircle className="w-8 h-8" />
            </button>
          </div>
        </div>

        <div className="flex flex-row justify-between items-start w-full h-[640px]">
          <div className="flex justify-center items-start w-full h-full text-xs lg:text-sm font-bold text-[#7863f7] mb-20 col-span-2 p-2 lg:p-4 overflow-y-auto">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek',
              }}
              events={allEvents as EventSourceInput}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => {
                addEvent(data);
              }}
              eventClick={(data) => {
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                handleDeleteModal(data);
              }}
              height="auto"
              contentHeight="auto"
            />
          </div>

          <div className="border-dashed border-[2px] h-full border-[#9665FF] hidden xl:block bottom-[2%] right-1/4 -mt-4" />

          <div
            id="draggable-el"
            className="w-80 h-full m-2 rounded-md hidden xl:flex flex-col gap-2"
          >
            <h1 className="font-bold text-2xl text-center text-[#7863f7]">
              {t('calendar.addEvent')}
            </h1>
            {events.map((event) => (
              <button
                className="fc-event border-2 border-[#B398F5] w-full h-20 rounded-md ml-auto text-center text-[#7863f7] font-bold"
                title={event.title}
                key={event.id}
              >
                {event.title}
              </button>
            ))}
          </div>
        </div>

        <>
          <Transition.Root show={showDeleteModal} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={setShowDeleteModal}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center  justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel
                      className="relative transform overflow-hidden rounded-lg
                   bg-white text-left shadow-2xl shadow-[#B398F5] transition-all sm:my-8 sm:w-full sm:max-w-lg"
                    >
                      <div className="bg-white w-80 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#6636E2] sm:mx-0 sm:h-10  sm:w-10">
                            <ExclamationTriangleIcon
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-base font-semibold leading-6 text-[#6636E2]"
                            >
                              Delete event
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Are you sure you want to delete this event?
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-[#6636E2] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto hover:shadow-2xl hover:shadow-[#B398F5] hover:scale-105 transition-all duration-300"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-[#6636E2] px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-600 sm:mt-0 sm:w-auto hover:shadow-2xl hover:shadow-[#B398F5] hover:scale-105 transition-all duration-300 hover:z-50"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-[#6636E2] px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-600 sm:mt-0 sm:w-auto hover:shadow-2xl hover:shadow-[#B398F5] hover:scale-105 transition-all duration-300 hover:z-50"
                          onClick={handleShowEventDetails}
                        >
                          View Details
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </>

        <>
          <Transition.Root show={showModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setShowModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-2xl shadow-[#B398F5] transition-all sm:my-8 w-80 sm:w-full sm:max-w-lg sm:p-6">
                      <div>
                        <div className="h-full w-full flex items-center justify-center">
                          <Image
                            src="/images/logo/logo-1.svg"
                            alt="Logo"
                            width={200}
                            height={200}
                          />
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-[#6636E2]"
                          >
                            Add Event
                          </Dialog.Title>
                          <form action="submit" onSubmit={handleSubmit}>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="title"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 
                            focus:ring-inset focus:ring-violet-600 
                            sm:text-sm sm:leading-6 px-4"
                                value={newEvent.title}
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                placeholder="Title"
                              />
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                              <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500  sm:col-start-2 hover:shadow-2xl hover:shadow-[#B398F5] hover:scale-105 transition-all duration-300"
                                disabled={newEvent.title === ''}
                              >
                                Create
                              </button>
                              <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0 hover:shadow-2xl hover:shadow-[#B398F5] hover:scale-105 transition-all duration-300"
                                onClick={handleCloseModal}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </>

        <>
          <Transition.Root show={showEventDetailsModal} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={setShowEventDetailsModal}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center  justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-2xl shadow-[#B398F5] transition-all sm:my-8 w-80 sm:w-full sm:max-w-lg sm:p-6">
                      <div>
                        <div className="mt-3 text-center sm:mt-5">
                          <div className="h-full w-full flex items-center justify-center mb-4">
                            <Image
                              src="/images/logo/logo-1.svg"
                              alt="Logo"
                              width={200}
                              height={200}
                            />
                          </div>

                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-[#6636E2]"
                          >
                            Event Details
                          </Dialog.Title>
                          <div className="mt-2 w-full h-80 ">
                            <div className="w-full h-10 border-2 border-[#B398F5] flex flex-col justify-center items-center mb-2">
                              <p className="text-xl text-[#6636E2]">
                                {selectedEvent?.title}
                              </p>
                            </div>

                            <div className="w-full h-20 border-2 border-[#B398F5] flex flex-col justify-center items-center mb-2">
                              <p className="text-xl text-[#6636E2]">
                                Nombre Apellido
                                {/* Start: {selectedEvent?.start.toString()} */}
                              </p>
                              <p className="text-sm text-[#6636E2]">
                                correoExample@gmail.com
                                {/* All Day: {selectedEvent?.allDay ? 'Yes' : 'No'} */}
                              </p>
                            </div>
                            <div className="w-full h-20 border-2 border-[#B398F5] flex flex-col justify-center items-center mb-2"></div>
                            <div className="w-full h-20 border-2 border-[#B398F5] flex flex-col justify-center items-center mb-2"></div>
                          </div>

                          <div className="mt-5 w-full">
                            <button
                              type="button"
                              className="inline-flex w-40 justify-center  rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:col-start-2 hover:bg-blue-600  hover:shadow-2xl hover:shadow-[#B398F5] hover:scale-105 transition-all duration-300"
                              onClick={handleCloseEventDetailsModal}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </>
      </div>
    </>
  );
}
