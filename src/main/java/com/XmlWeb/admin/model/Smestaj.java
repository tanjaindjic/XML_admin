package com.XmlWeb.admin.model;


import javax.persistence.*;
import java.util.List;

@Entity
public class Smestaj {

    @Id
    @GeneratedValue
    private Long id;

    private String naziv;

    private String adresa;

    private String grad;

    private String drzava;

    @Column(length = 2084)
    private String gmapUrl;

    private Integer zvezdice;

    @ManyToMany
    private List<DodatneUsluge> dodatneUsluge;

    @OneToMany
    private List<Slika> slike;

    private String opis;

    @OneToMany
    private List<Soba> sobe;

    @ManyToOne
    private TipSmestaja tip;

    @ManyToOne
    private Korisnik vlasnik;

    private float rejting;

    private int brojOcena;

    public Smestaj() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public String getGrad() {
        return grad;
    }

    public void setGrad(String grad) {
        this.grad = grad;
    }

    public String getDrzava() {
        return drzava;
    }

    public void setDrzava(String drzava) {
        this.drzava = drzava;
    }

    public String getGmapUrl() {
        return gmapUrl;
    }

    public void setGmapUrl(String gmapUrl) {
        this.gmapUrl = gmapUrl;
    }

    public Integer getZvezdice() {
        return zvezdice;
    }

    public void setZvezdice(Integer zvezdice) {
        this.zvezdice = zvezdice;
    }

    public List<DodatneUsluge> getDodatneUsluge() {
        return dodatneUsluge;
    }

    public void setDodatneUsluge(List<DodatneUsluge> dodatneUsluge) {
        this.dodatneUsluge = dodatneUsluge;
    }

    public List<Slika> getSlike() {
        return slike;
    }

    public void setSlike(List<Slika> slike) {
        this.slike = slike;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public List<Soba> getSobe() {
        return sobe;
    }

    public void setSobe(List<Soba> sobe) {
        this.sobe = sobe;
    }

    public TipSmestaja getTip() {
        return tip;
    }

    public void setTip(TipSmestaja tip) {
        this.tip = tip;
    }

    public Korisnik getVlasnik() {
        return vlasnik;
    }

    public void setVlasnik(Korisnik vlasnik) {
        this.vlasnik = vlasnik;
    }

    public float getRejting() {
        return rejting;
    }

    public void setRejting(float rejting) {
        this.rejting = rejting;
    }

    public int getBrojOcena() {
        return brojOcena;
    }

    public void setBrojOcena(int brojOcena) {
        this.brojOcena = brojOcena;
    }
}
