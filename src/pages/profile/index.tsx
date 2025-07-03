import { createRoot } from "react-dom/client";

const MyReact = (() => {
    const states: any[] = [];
    const stateSetters: any[] = [];
    let stateIndex = 0;

    function createState(initialState: any, stateIndex: number) {
        return states[stateIndex] ?? initialState;
    }

    function createStateSetter(stateIndex: number) {
        return function (newState: any) {
            if (typeof newState === "function") {
                states[stateIndex] = newState(states[stateIndex]);
            } else {
                states[stateIndex] = newState;
            }
            render();
        };
    }
    function useState(initialState: any) {
        states[stateIndex] = createState(initialState, stateIndex);
        if (!stateSetters[stateIndex]) {
            stateSetters.push(createStateSetter(stateIndex));
        }
        const state = states[stateIndex];
        const setState = stateSetters[stateIndex];
        stateIndex++;

        return [state, setState];
    }

    function render() {
        stateIndex = 0;
        const ele = document.querySelector("#root");
        if (ele) {
            createRoot(ele).render(<Profile />);
        }
    }

    return {
        useState,
    };
})();
const { useState } = MyReact;

const Profile = () => {
    const [count, setCount] = useState(0);
    console.log("setCount类型", typeof setCount);
    const [count2, setCount2] = useState(5);
    console.log(count);
    return (
        <div style={{ height: 200, width: 800, margin: 32 }}>
            <div style={{ height: 32, width: 120, fontSize: 24 }}>{count}</div>
            <button
                style={{ height: 32, width: 120 }}
                onClick={() => setCount(count + 1)}
            >
                +
            </button>
            <div style={{ height: 32, width: 120, fontSize: 24 }}>{count2}</div>
            <button
                style={{ height: 32, width: 120 }}
                onClick={() => setCount2((prev: any) => prev - 1)}
            >
                +
            </button>
        </div>
    );
};

export default Profile;
