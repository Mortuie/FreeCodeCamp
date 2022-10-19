package com.mortuie.pinterest.PinterestClone.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UserModel {
    private int id;
    private String username;
    private String password;
}
