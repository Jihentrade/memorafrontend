import React, { useRef, useState, useEffect } from "react";
import { Modal, Box, Button } from "@mui/material";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  convertToPixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "./canvasPreview";

const ASPECT_RATIO = 1;
// const MIN_DIMENSION = 50;
const FIXED_DIMENSION_MM = 50;

const EditImageModal = ({
  image,
  originalImages,
  open,
  handleClose,
  onUpdate,
  handleUpdateOldImage,
}) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(image?.image);
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);

  useEffect(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      setCanvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        convertToPixelCrop(
          completedCrop,
          imgRef.current.width,
          imgRef.current.height
        )
      );
    }
  }, [completedCrop]);

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const fixedDimensionPx = (FIXED_DIMENSION_MM / 25.4) * 96;
    const crop = makeAspectCrop(
      {
        unit: "px",
        x: 25,
        y: 25,
        width: fixedDimensionPx,
        height: fixedDimensionPx,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
    setCompletedCrop(centeredCrop);
  };

  const handleSave = () => {
    if (!previewCanvasRef.current) return;

    previewCanvasRef.current.toBlob((blob) => {
      const croppedFile = new File(
        [blob],
        imgSrc?.file?.path ? imgSrc?.file?.path : imgSrc?.file?.name,
        {
          type: "image/png",
        }
      );
      const updatedImage = {
        file: croppedFile,
        preview: URL.createObjectURL(croppedFile),
        index: image?.index,
      };
      onUpdate(updatedImage);
    });
  };
  const handleBackToOldVersion = () => {
    handleUpdateOldImage(originalImages[image?.index]);
  };
  const handleCancel = () => {
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          height: "90%",
          width: "70%",
          overflowY: "scroll",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 2,
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>Crop your image to fit your magnet</h2>
        {imgSrc?.preview && (
          <div className="flex flex-col items-center">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={true}
              locked
            >
              <img
                ref={imgRef}
                src={imgSrc?.preview}
                alt="Upload"
                style={{ maxHeight: "200px" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
            <canvas
              ref={previewCanvasRef}
              style={{
                width: 0,
                height: 0,
              }}
            />
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => handleSave()}
            variant="contained"
            color="primary"
            style={{ marginRight: "15px" }}
          >
            Save
          </Button>
          {image?.image?.preview !== originalImages[image?.index]?.preview && (
            <Button
              onClick={() => handleBackToOldVersion()}
              variant="text"
              color="secondary"
              style={{ marginLeft: "0px", marginRight: "15px" }}
            >
              Back to old version
            </Button>
          )}
          <Button onClick={handleCancel} variant="contained" color="secondary">
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditImageModal;
