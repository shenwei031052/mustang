package cn.natic.mustang.dao;

import javax.persistence.*;

@Entity
public class AccountBook {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String type;



}
