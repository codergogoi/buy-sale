/* eslint-disable jsx-a11y/alt-text */
import {
  Dialog,
  DialogContent,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IMG_URL } from "../../utils/helpers";
import { FileUpload, PriceInput, TxtInput } from "../../components/Input";
import placeHolder from "../../images/product_placeholder.jpg";
import { ColDiv, RowDiv } from "../../components/Misc/misc.styled";
import { CloseButton, TapButton } from "../../components";
import { Spacer } from "../../components/Misc";
import { AppCSS } from "../../components";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CategoryModel, CreateProductInput, ProductModel } from "../../types";
import {
  CreateProduct,
  DeleteProduct,
  EditProduct,
} from "../../api/product-api";

interface EditProductProps {
  open: boolean;
  categories: CategoryModel[];
  product?: ProductModel;
  onClose: Function;
}

export const EditProductPopup: React.FC<EditProductProps> = ({
  open,
  categories,
  onClose,
  product,
}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [catId, setCatId] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(1);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setCatId(product.category_id);
      setPrice(product.price);
      setStock(product.stock);
      setImage(product.image_url);
    }
  }, [open]);

  const resetModal = () => {
    setName("");
    setDescription("");
    setCatId("");
    setPrice(0);
    setStock(1);
    setImage("");
  };

  const onHandleClose = () => {
    resetModal();
    onClose();
  };

  const onTapEditProduct = async () => {
    const input: CreateProductInput = {
      category_id: +catId,
      name: name,
      description: description,
      image_url: image,
      price: +price,
      stock: +stock,
    };

    const status = await EditProduct(product?.id as number, input);
    if (status === 200) {
      toast("Product Edited successfully!", {
        type: "success",
        style: {
          width: "400px",
        },
      });
      onHandleClose();
    }
  };

  const onTapDeleteProduct = async () => {
    const status = await DeleteProduct(product?.id as number);
    if (status === 200) {
      toast("Product Deleted successfully!", {
        type: "success",
        style: {
          width: "400px",
        },
      });
      onHandleClose();
    }
  };

  const viewImage = (imageName?: string) => {
    const url = IMG_URL(imageName);
    // console.log(url);
    return url ? url : placeHolder;
  };

  const onSelectCat = (event: SelectChangeEvent) => {
    setCatId(event.target.value);
  };

  const displayCatagories = () => {
    if (Array.isArray(categories)) {
      return categories.map((item) => {
        return <MenuItem value={item.id}>{item.name}</MenuItem>;
      });
    }
    return <></>;
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      aria-disabled={true}
    >
      <DialogContent
        style={{
          width: "380px",
        }}
      >
        <ColDiv
          style={{
            width: "100%",
          }}
        >
          <RowDiv
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <CloseButton onTap={() => onHandleClose()} />
          </RowDiv>

          <ColDiv
            style={{
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <TxtInput
              placeholder="Product Name"
              onChange={setName}
              value={name}
              required
            />
            <Spacer size={1} direction="col" />
            <TxtInput
              placeholder="Side description"
              onChange={setDescription}
              value={description}
              lines={4}
            />
            <RowDiv
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <FormControl
                fullWidth
                variant="filled"
                style={{
                  width: "98%",
                  background: AppCSS.GRAY_MILD,
                  borderRadius: "4px",
                }}
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={`${catId}`}
                  label="Select category"
                  onChange={onSelectCat}
                  disableUnderline
                  style={{
                    background: "none",
                    marginLeft: "10px",
                  }}
                >
                  <MenuItem value={-1} disabled selected>
                    <p
                      style={{
                        background: AppCSS.GRAY_MILD,
                        margin: "5px",
                        color: AppCSS.GRAY,
                      }}
                    >
                      Select category
                    </p>
                  </MenuItem>
                  {displayCatagories()}
                </Select>
              </FormControl>
            </RowDiv>
            <Spacer size={1} direction="col" />
            <RowDiv>
              <PriceInput
                value={`${price}`}
                placeholder="Product price"
                onChange={setPrice}
                required
              />
              <Spacer size={1} direction="row" />
              <TxtInput
                width={100}
                value={stock}
                placeholder="Stock"
                onChange={setStock}
                required
              />
            </RowDiv>

            <Spacer size={1} direction="col" />
            <RowDiv
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FileUpload
                width={380}
                fileType="IMG"
                placeholder="Upload Image"
                onSelectFile={setImage}
              />
            </RowDiv>
            <RowDiv
              style={{
                justifyContent: "center",
              }}
            >
              <img src={viewImage("")} height="200px" />
            </RowDiv>

            <Spacer size={1} direction="col" />
            <ColDiv
              style={{
                alignItems: "center",
              }}
            >
              {product && (
                <RowDiv
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <TapButton
                    width={160}
                    onTap={() => onTapDeleteProduct()}
                    title="Delete"
                    color={AppCSS.RED}
                    bgColor="none"
                  />
                  <Spacer size={2} direction="row" />
                  <TapButton
                    width={160}
                    onTap={() => onTapEditProduct()}
                    bgColor={AppCSS.ORANGE}
                    title="Save"
                  />
                </RowDiv>
              )}
            </ColDiv>
          </ColDiv>
        </ColDiv>
      </DialogContent>
    </Dialog>
  );
};
