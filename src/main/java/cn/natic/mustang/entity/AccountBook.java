package cn.natic.mustang.entity;

import javax.persistence.*;

@Entity
public class AccountBook {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String type;



}
