package com.mortuie.pinterest.PinterestClone.services;

import com.mortuie.pinterest.PinterestClone.models.UserModel;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class UserService {
    private List<UserModel> userModelList = new ArrayList<>();
    private Set<String> usernameSet = new HashSet<>();


    UserModel createUser(UserModel newUser) throws Exception {
        if (!usernameSet.contains(newUser.getUsername())) {
            UserModel tempUser = UserModel
                .builder()
                .id(userModelList.size())
                .username(newUser.getUsername())
                .password(newUser.getPassword())
                .build();

            userModelList.add(tempUser);
            usernameSet.add(tempUser.getUsername());

            return tempUser;
        } else {
            throw new Exception("Username already exists");
        }
    }
}
