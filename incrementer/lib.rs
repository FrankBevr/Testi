#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod incrementer {

    #[ink(storage)]
    pub struct Incrementer {
        value: i32,
    }

    impl Incrementer {
        #[ink(constructor)]
        pub fn new(init_value: i32) -> Self {
            Self { value: init_value }
        }

        #[ink(message)]
        pub fn inc(&mut self) {
            self.value += 1;
        }

        #[ink(message)]
        pub fn get(&self) -> i32 {
            self.value
        }
    }
}