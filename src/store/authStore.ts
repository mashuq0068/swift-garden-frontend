import { create } from 'zustand';

const useAuthStore = create((set, get) => ({

        loginData: {
            token: "",
            permission: "",
            role: "",
            userStatus: ""
        },
        onChangeLoginData: (data) => {set({loginData: { ...get().loginData, ...data }})
            const updatedLoginData = get().loginData;
            console.log(updatedLoginData);
        },
        setLoginData: (data) => {set({ loginData: data })}
}));

export default useAuthStore;
