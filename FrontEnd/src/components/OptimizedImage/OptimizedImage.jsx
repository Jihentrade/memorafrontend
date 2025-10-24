import { useState, useEffect, useRef } from "react";

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e0e0e0'/%3E%3C/svg%3E",
  onLoad,
  style = {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current || loading !== "lazy") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  const imgStyle = {
    opacity: isLoaded ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
    ...style,
  };

  return (
    <div
      ref={imgRef}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f0f0f0",
        ...style,
      }}
    >
      {!isLoaded && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          onLoad={handleLoad}
          style={imgStyle}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;

