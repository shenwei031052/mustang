package cn.natic.mustang.controller;

import cn.natic.mustang.entity.User;
import cn.natic.mustang.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserRepository repository;

    @RequestMapping("/getLoginUser")
    public User getLoginUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return repository.findByUsername(username);
    }

    @RequestMapping("/deleteUser")
    public void deleteUser(@RequestBody User user) {
        repository.delete(user);
    }

    @RequestMapping("/addUser")
    public User addUser(@RequestBody User user) {
        return repository.save(user);
    }

    @RequestMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @Transactional
    @RequestMapping("/upsertUsers")
    public List<User> upsertUsers(@RequestBody List<User> users) {
        return repository.save(users);
    }

    @RequestMapping("/getAllInvestors")
    public List<User> getAllInvestors() {
        return repository.findByRole("investor");
    }

}
