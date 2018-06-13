package com.XmlWeb.admin.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.XmlWeb.admin.model.Korisnik;


public interface KorisnikRepository extends CrudRepository<Korisnik, Long>{
	Korisnik findByUsernameIgnoreCase(String username);
	Optional<Korisnik> findById(Long id);
	Korisnik findByEmailIgnoreCase(String email);
	Korisnik findByConfirmationToken(String confirmationToken);

}
