//package com.example.adminlogin.controller;
//
//import com.example.adminlogin.model.Role;
//import com.example.adminlogin.repository.RoleRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/roles")
//@CrossOrigin
//
//public class RoleController {
//    private final RoleRepo roleRepo;
//
//    @Autowired
//    public RoleController(RoleRepo roleRepo) {
//        this.roleRepo = roleRepo;
//    }
//
//    // Endpoint to create a new role
//    @PostMapping("/create")
//    public ResponseEntity<Role> createRole(@RequestBody Role role) {
//        Role savedRole = roleRepo.save(role);
//        return ResponseEntity.ok(savedRole);
//    }
//
//    // Endpoint to retrieve all roles
//    @GetMapping("/all")
//    public ResponseEntity<List<Role>> getAllRoles() {
//        List<Role> roles = roleRepo.findAll();
//        return ResponseEntity.ok(roles);
//    }
//
//    // Endpoint to get a role by roleId
//    @GetMapping("/{roleId}")
//    public ResponseEntity<Role> getRoleById(@PathVariable Long roleId) {
//        Optional<Role> roleOptional = roleRepo.findById(roleId);
//        return roleOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    // Endpoint to update a role by roleId
//    @PutMapping("/update/{roleId}")
//    public ResponseEntity<Role> updateRole(@PathVariable Long roleId, @RequestBody Role updatedRole) {
//        Optional<Role> roleOptional = roleRepo.findById(roleId);
//        if (roleOptional.isPresent()) {
//            Role existingRole = roleOptional.get();
//            existingRole.setRoleName(updatedRole.getRoleName());
//            Role savedRole = roleRepo.save(existingRole);
//            return ResponseEntity.ok(savedRole);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    // Endpoint to delete a role by roleId
//    @DeleteMapping("/delete/{roleId}")
//    public ResponseEntity<Void> deleteRole(@PathVariable Long roleId) {
//        roleRepo.deleteById(roleId);
//        return ResponseEntity.noContent().build();
//    }
//}
//
//
//
