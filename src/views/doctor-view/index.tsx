import { Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Doctor, File_Db } from '@/types';
import { socialMediaIcons } from '@/utils/social-media-icos';

export const DoctorView = ({
  doctor,
  curriculum,
}: {
  doctor: Doctor;
  curriculum: File_Db;
}) => {
  const { t } = useTranslation('common');

  const cvGetterHandler = async () => {
    if (curriculum.file_link) {
      try {
        const link = document.createElement('a');
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        link.href = curriculum.file_link;
        link.target = '_blank';
        link.click();

        toast({
          variant: 'success',
          title: 'Descargado',
          description: 'Archivo descargado con éxito',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Error al descargar el archivo',
        });
      }
    }
  };

  const surgeryCategory = [
    'Rinoplastia',
    'Liposucción',
    'Blefaroplastia',
    'Mamoplastia',
    'Abdominoplastia',
    'Otoplastia',
  ];

  const surgeriesTestimonials = [
    {
      testimonio:
        'Me realicé una rinoplastia con el Dr Axel Hemmingsen. Salió excelente. Con su equipo fueron muy amables en todo momento Super profesional, siempre resolvió mis dudas y dejó un resultado increíble. Quedé encantada, superó mis expectativas',
      autor: 'Renata Neira',
    },
    {
      testimonio:
        'Me realicé una rinoplastia con el Dr Axel Hemmingsen. Salió excelente. Con su equipo fueron muy amables en todo momento Super profesional, siempre resolvió mis dudas y dejó un resultado increíble. Quedé encantada, superó mis expectativas',
      autor: 'Evelyn Gonzales',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);

  const slidesDesktop = [
    '/images/surgeriesBackAfter/surgeryExample.svg',
    '/images/surgeriesBackAfter/surgeryExample2.svg',
  ];

  const slidesMobile = [
    '/images/surgeriesBackAfter/surgeryExample.svg',
    '/images/surgeriesBackAfter/surgeryExample2.svg',
  ];

  const slidesToShow = isMobile ? slidesMobile : slidesDesktop;

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slidesToShow.length - 1 : prevIndex - 1,
    );
    resetInterval();
  };

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slidesToShow.length - 1 ? 0 : prevIndex + 1,
    );
    resetInterval();
  };

  const resetInterval = (): void => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 4000);
  };

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="mb-16  flex flex-col items-center justify-center">
        <div className="flex flex-col w-screen lg:w-full h-96">
          <div className="bg-[#6636E2] w-screen lg:w-full h-32 flex justify-center items-center">
            <h1 className="text-center font-extrabold text-white text-4xl lg:text-7xl">
              {t('ourProfessional')}
            </h1>
          </div>

          <div className="bg-[#B398F5] w-screen lg:w-full h-20 flex justify-center items-center">
            <div className="flex flex-row justify-center gap-32 lg:gap-96">
              <div className="flex flex-col text-[#6636E2] gap-y-2">
                <p className="font-bold text-xs lg:text-base">
                  Dr. {doctor.user?.first_name}
                </p>
                <div className="flex flex-row gap-1 lg:gap-2 text-xs lg:text-xl  text-[#6636E2]">
                  {doctor.user?.social_media?.slice(0, 3).map((social) => {
                    const Icon = socialMediaIcons[social.type];
                    return (
                      <a href={social.link} target="_blank" key={social.type}>
                        <Icon className="md:text-base text-xs text-white -mt-4 my-4 md:mt-0 md:my-0" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <Link
                href={'/'}
                className="text-[#6636E2] text-xs lg:text-2xl font-bold flex flex-row justify-center lg:items-center"
              >
                <MdKeyboardArrowLeft className="text-lg lg:text-2xl text-[#6636E2]" />
                {t('surgeriesProducts.backToList')}
              </Link>
            </div>
          </div>

          <div className="w-screen lg:w-full h-32 flex justify-center items-center -mt-4">
            <div className="flex flex-col lg:flex-row justify-center  items-center lg:gap-20">
              <span className="w-40 h-20 hidden text-[#B398F5] text-lg text-left lg:flex items-center justify-center">
                Cirujano plástico en Formosa
              </span>

              <div className="bg-white border-2 border-[#6636E2] w-48 h-48 rounded-full flex justify-center items-center mt-12 lg:-mt-10">
                <Image
                  src={
                    doctor.user?.profile_picture &&
                    doctor.user.profile_picture !== ''
                      ? doctor.user.profile_picture
                      : '/images/surgerys/mamas.svg'
                  }
                  alt="Logo"
                  width={150}
                  height={150}
                  className="rounded-full border-8 border-white w-full h-full"
                />
              </div>

              <div className="flex flex-col gap-2 justify-center items-center">
                {curriculum?.file_link && (
                  <Button
                    onClick={cvGetterHandler}
                    className="bg-[#6636E2] rounded-2xl w-40 h-10 mt-2 lg:mt-0 hover:shadow-2xl hover:shadow-[#B398F5] hover:z-50 text-white text-center flex items-center justify-center"
                  >
                    {t('ourProfessionalPage.myCurriculum')}
                  </Button>
                )}

                <div className="flex flex-col justify-center items-center">
                  <span className="text-xs lg:text-base text-[#6636E2]">
                    {t('ourProfessionalPage.rating')}
                  </span>
                  <Rating
                    className="hover:shadow-2xl hover:shadow-[#B398F5] md:text-base text-sm"
                    value={4}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <>
          {/* Tags Surgerys */}
          <div className="flex flex-wrap  justify-center items-center h-auto w-screen mt-20 lg:mt-0 lg:w-[800px] mb-10 ">
            {surgeryCategory.map((category, index) => (
              <div key={index} className="w-1/3 p-2 flex justify-center">
                <Link
                  href={'/store'}
                  className="rounded-xl bg-white hover:bg-[#6636E2] hover:shadow-2xl hover:shadow-[#B398F5] hover:z-50 hover:text-white text-[#6636E2] text-xs flex items-center justify-center lg:text-base border-2 border-[#6636E2] w-full h-8 text-center"
                >
                  {category}
                </Link>
              </div>
            ))}

            <div className="w-screen lg:w-[800px] h-auto mt-8 lg:mt-10 m-4 lg:m-0">
              <p className="text-xs lg:text-sm text-justify">
                {doctor.description}
              </p>
            </div>
          </div>

          {/* Imagenes y Video */}
          <div className="w-full h-auto flex flex-col justify-center items-center ">
            <h1 className="flex justify-start w-screen lg:w-[800px] text-xl font-bold p-4 text-[#6636E2]">
              {t('ourProfessionalPage.beforeandAfter')}
            </h1>

            {/* Imagenes Carousel */}
            <div className="flex justify-center items-center w-screen lg:w-[800px] h-auto border-2 border-white border-b-[#B398F5] border-t-[#B398F5]">
              <div className="relative w-full overflow-hidden max-w-screen-2xl mx-auto">
                <div className="flex items-center justify-center transition-transform duration-500 ease-in-out w-full">
                  <div
                    ref={carouselRef}
                    className="flex"
                    style={{
                      transform: `translateX(-${currentIndex * 100}%)`,
                      width: `${slidesToShow.length * 200}%`,
                    }}
                  >
                    {slidesToShow.map((slide, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-full flex justify-center items-center max-w-screen-2xl mx-auto max-h-[490px] my-auto h-72 lg:h-screen"
                        style={{ minWidth: '100%' }}
                      >
                        <Image
                          src={slide}
                          alt={`Slide ${index + 1}`}
                          width={1536}
                          height={490}
                          className="w-full h-full p-10"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="absolute top-1/2 -left-6 lg:left-0 transform -translate-y-1/2 px-4 py-2 text-[#8565ff] rounded-l-md"
                  onClick={prevSlide}
                >
                  <FiChevronLeft size={54} />
                </button>
                <button
                  className="absolute top-1/2  -right-6 lg:right-0 transform -translate-y-1/2 px-4 py-2 text-[#8565ff] rounded-r-md "
                  onClick={nextSlide}
                >
                  <FiChevronRight size={54} />
                </button>
              </div>
            </div>

            <h1 className="flex justify-start w-screen lg:w-[800px] text-xl font-bold p-4 text-[#6636E2]">
              {t('ourProfessionalPage.myVideos')}
            </h1>

            {/* Videos */}
            <div className="flex flex-col justify-center w-screen lg:w-[800px] h-auto border-2 gap-2 p-4 border-white border-b-[#B398F5]">
              <div className="w-full h-auto flex flex-row gap-2">
                <button className="bg-[#6636E2] hover:shadow-2xl hover:shadow-[#B398F5] hover:z-50 flex justify-center items-center w-full h-32">
                  <p className="w-12 h-12 flex justify-center items-center border-2 rounded-full border-white">
                    <FaPlay className="w-4 h-4 text-center text-white" />
                  </p>
                </button>
                <button className="bg-[#6636E2] hover:shadow-2xl hover:shadow-[#B398F5] hover:z-50 flex justify-center items-center w-full h-32">
                  <p className="w-12 h-12 flex justify-center items-center border-2 rounded-full border-white">
                    <FaPlay className="w-4 h-4 text-center text-white" />
                  </p>
                </button>
                <button className="bg-[#6636E2] hover:shadow-2xl hover:shadow-[#B398F5] hover:z-50 flex justify-center items-center w-full h-32">
                  <p className="w-12 h-12 flex justify-center items-center border-2 rounded-full border-white">
                    <FaPlay className="w-4 h-4 text-center text-white" />
                  </p>
                </button>
              </div>
              <div className="w-full h-auto flex flex-row gap-2">
                <button className="bg-[#6636E2] hover:shadow-2xl hover:shadow-[#B398F5] hover:z-50 flex justify-center items-center w-full h-32">
                  <p className="w-12 h-12 flex justify-center items-center border-2 rounded-full border-white">
                    <FaPlay className="w-4 h-4 text-center text-white" />
                  </p>
                </button>
                <button className="bg-[#6636E2] hover:shadow-2xl hover:shadow-[#B398F5] hover:z-50 flex justify-center items-center w-full h-32">
                  <p className="w-12 h-12 flex justify-center items-center border-2 rounded-full border-white">
                    <FaPlay className="w-4 h-4 text-center text-white" />
                  </p>
                </button>
                <button className="bg-[#6636E2] hover:shadow-2xl hover:shadow-[#B398F5] hover:z-50 flex justify-center items-center w-full h-32">
                  <p className="w-12 h-12 flex justify-center items-center border-2 rounded-full border-white">
                    <FaPlay className="w-4 h-4 text-center text-white" />
                  </p>
                </button>
              </div>
            </div>

            <>
              <h1 className="flex justify-start w-screen lg:w-[800px] text-xl font-bold p-4 text-[#6636E2]">
                {t('ourProfessionalPage.testimonials')}
              </h1>

              <div className="flex justify-center items-center w-screen lg:w-[800px] h-auto">
                <div className="w-full h-auto flex flex-row justify-center gap-1 lg:gap-2 p-4">
                  {surgeriesTestimonials.map((testimonial, index) => (
                    <button
                      key={index}
                      className="flex flex-col justify-center items-center w-72 lg:w-full h-64 bg-[#B398F5] bg-opacity-50 text-[#6636E2] hover:shadow-2xl hover:shadow-[#B398F5]"
                    >
                      <p className="text-justify text-[10px] lg:text-sm px-8 mb-2 lg:mb-0">
                        {testimonial.testimonio}
                      </p>
                      <p className="flex justify-end w-full text-[9px]  lg:text-lg px-8 font-bold">
                        {testimonial.autor}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Botones Carousel  */}
                <button className="absolute left-0 lg:left-80 transform -translate-y-2/2 px-4 py-2 text-[#8565ff] rounded-l-md">
                  <FiChevronLeft size={32} />
                </button>

                <button className="absolute right-0 lg:right-80 transform -translate-y-2/2 px-4 py-2 text-[#8565ff] rounded-r-md">
                  <FiChevronRight size={32} />
                </button>
              </div>
            </>
          </div>

          <Link
            href={'/store'}
            className="bg-[#6636E2] flex justify-center items-center hover:shadow-2xl hover:shadow-[#B398F5] hover:z-50 text-white font-bold rounded-3xl w-80 h-12 mt-24"
          >
            {t('ourProfessionalPage.startMyTransformation')}
          </Link>
        </>
      </div>
    </>
  );
};
