package com.example.apinext.repository;

import com.example.apinext.model.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IColorRepository extends JpaRepository<Color, String> {
}
