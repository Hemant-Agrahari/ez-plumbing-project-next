export const sliderblogsSettings = {
    infinite: false,
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 3,
          autoplay: true,
          autoplaySpeed: 2000,
          dots: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 2,
          autoplay: true,
          autoplaySpeed: 2000,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.6,
          slidesToScroll: 2,
          autoplay: true,
          autoplaySpeed: 2000,
          dots: true,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          dots: true,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          dots: true,
        },
      },
    ],
  };