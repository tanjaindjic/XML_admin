package com.XmlWeb.admin.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.List;

@Entity
@Table(name = "AUTHORITY")
public class Authority {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "authority_seq")
    @SequenceGenerator(name = "authority_seq", sequenceName = "authority_seq", allocationSize = 1)
    private Long id;

    @Column(name = "NAME", length = 50)
    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthorityName name;


    @Column(name = "USERS")
    @ManyToMany
    @JsonBackReference
    private List<Korisnik> users;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AuthorityName getName() {
        return name;
    }

    public void setName(AuthorityName name) {
        this.name = name;
    }

    public List<Korisnik> getUsers() {
        return users;
    }

    public void setUsers(List<Korisnik> users) {
        this.users = users;
    }
}