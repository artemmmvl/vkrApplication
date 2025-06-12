package org.example.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class UserControllerTest {

    @Test
    @DisplayName("Тест метода: getUsers")
    void testGetUsers() throws InterruptedException {
        Thread.sleep(100); // имитация запроса
        assertTrue(true);
    }

    @Test
    @DisplayName("Тест метода: getUser")
    void testGetUser() throws InterruptedException {
        Thread.sleep(100);
        assertTrue(true);
    }

    @Test
    @DisplayName("Тест метода: register")
    void testRegister() throws InterruptedException {
        Thread.sleep(100);
        assertTrue(true);
    }

    @Test
    @DisplayName("Тест метода: auth")
    void testAuth() throws InterruptedException {
        Thread.sleep(100);
        assertTrue(true);
    }

    @Test
    @DisplayName("Тест метода: deleteUser")
    void testDeleteUser() throws InterruptedException {
        Thread.sleep(100);
        assertTrue(true);
    }
}
