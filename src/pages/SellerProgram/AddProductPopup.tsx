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
import { CategoryModel, ProductModel } from "../../types";

interface AddProductProps {
  open: boolean;
  categories: CategoryModel[];
  onContinue: Function;
  onCancel: Function;
}

export const AddProductPopup: React.FC<AddProductProps> = ({
  open,
  categories,
  onContinue,
  onCancel,
}) => {
  const dispatch = useDispatch();

  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [currentCat, setCurrentCat] = useState("");
  const [freeSides, setFreeSides] = useState<string[]>([]);
  const [isAlcohol, setIsAlcohol] = useState(false);
  const [options, setOptions] = useState({});
  const [taxCatId, setTaxCatId] = useState("");

  const [product, setProduct] = useState<ProductModel>();

  useEffect(() => {}, []);

  const existingOptions = () => {
    // if (product?.ingredients) {
    //   const initialValue = {};
    //   return product.ingredients.reduce((obj, item) => {
    //     return {
    //       ...obj,
    //       [item]: item,
    //     };
    //   }, initialValue);
    // }
    return {};
  };

  const resetModal = () => {
    setName("");
    setItemPrice(0);
    setImage("");
    setDescription("");
    setFreeSides([]);
    setIsAlcohol(false);
    setOptions({});
    setTaxCatId("");
  };

  const onHandleCancel = () => {
    onCancel();
  };

  const addFreeSides = (side: string) => {
    let newFreeSides = freeSides;
    if (newFreeSides.length > 0) {
      if (newFreeSides.find((item) => item === side)) {
        const excludeSides = newFreeSides.filter((item) => item !== side);
        setFreeSides(excludeSides);
      } else {
        setFreeSides([...newFreeSides, side]);
      }
    } else {
      setFreeSides([side]);
    }
  };

  const onTapContinue = () => {
    onContinue();
  };

  const viewImage = (imageName?: string) => {
    const url = IMG_URL(imageName);
    // console.log(url);
    return url ? url : placeHolder;
  };

  const handleSaveFood = () => {};

  const onChangeSelectFreeSides = (event: SelectChangeEvent) => {
    setCurrentCat(event.target.value);
  };

  const displayCatagories = () => {
    if (Array.isArray(categories)) {
      return categories.map((item) => {
        return <MenuItem value={item._id}>{item.name}</MenuItem>;
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
            <CloseButton onTap={() => onHandleCancel()} />
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
                  value={`${currentCat}`}
                  label="Select category"
                  onChange={onChangeSelectFreeSides}
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
            <PriceInput
              value={`${itemPrice}`}
              placeholder="Item price"
              onChange={setItemPrice}
              required
            />
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
              {product ? (
                <RowDiv
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <TapButton
                    width={160}
                    onTap={() => {}}
                    title="Delete"
                    color={AppCSS.RED}
                    bgColor="none"
                  />
                  <Spacer size={2} direction="row" />
                  <TapButton
                    width={160}
                    onTap={() => handleSaveFood()}
                    bgColor={AppCSS.RED}
                    title="Save"
                  />
                </RowDiv>
              ) : (
                <TapButton width={320} onTap={onTapContinue} title="Create" />
              )}
            </ColDiv>
          </ColDiv>
        </ColDiv>
      </DialogContent>
    </Dialog>
  );
};
