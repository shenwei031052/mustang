package cn.natic.mustang.repository;

import cn.natic.mustang.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import javax.transaction.Transactional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findAll();

    List<User> findByRole(String role);

    User findByUsername(String username);

    //User save(User user);

    User findUserByUsernameAndPassword(String username, String password);

    @Transactional
    <S extends User> List<S> save(Iterable<S> users);

}
