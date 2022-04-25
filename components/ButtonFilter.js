import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import { setFilter } from "./filterSlice";

export const ButtonFilter = (props) => {
    const dispatch = useDispatch();

    return (
        <Button title={props.title}
            onPress={() => {
                dispatch(setFilter(props.dispatch));
            }}
            buttonStyle={{
                backgroundColor: "#8EDBBE",
                borderRadius: 5,
            }}
            containerStyle={{
                width: 150,
                marginTop: 5,
                marginHorizontal: 5,
            }}
        />
    )
}