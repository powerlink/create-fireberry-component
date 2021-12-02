const componentWithRedux = `import React from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import type { TState } from "store/reducers/T";
import type { GlobalState } from "store";
import * as S from "./style";

interface NAMEProps {

}

const NAME: React.FC<NAMEProps> = () => {
    const dispatch = useDispatch();
    const T = useSelector(selectState);

    return <S.NAME></S.NAME>;
};

export default NAME;

const getState = (state: GlobalState): TState => state.T;
const selectState = createSelector([getState], (state) => state);
`;

module.exports = { componentWithRedux };
