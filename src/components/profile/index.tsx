"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/lib/supabase/actions";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/types";

export default function ProfileData({ user }: { user: User }) {
  const initialState = useMemo(
    () => ({
      name: user?.name || "",
      ci: user?.ci || "",
      fecha_nacimiento: user?.fecha_nacimiento || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
    }),
    [user]
  );

  const [formData, setFormData] = useState(initialState);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setFormData(initialState);
  }, [initialState]);

  useEffect(() => {
    setIsChanged(
      Object.keys(initialState).some(
        (key) =>
          formData[key as keyof typeof formData] !==
          initialState[key as keyof typeof initialState]
      )
    );
  }, [formData, initialState]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSelectChange = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  }, []);

  const handleCancel = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  const handleSave = useCallback(() => {
    if (!formData.name || !formData.ci || !formData.phone) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });
    formDataToSubmit.append("id", user?.id || "");

    updateProfile(formDataToSubmit);
  }, [formData, user?.id]);

  return (
    <div>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="ci">Carnet</Label>
              <Input
                id="ci"
                placeholder="Tu carnet"
                value={formData.ci}
                onChange={handleChange}
                type="number"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                placeholder="1234567"
                value={formData.phone}
                onChange={handleChange}
                type="number"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="fecha_nacimiento">Fecha de nacimiento</Label>
              <Input
                id="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                type="date"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="gender">Género</Label>
              <Select
                value={formData.gender}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Femenino">Femenino</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Tu email"
                value={user?.email || ""}
                type="email"
                readOnly
              />
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/update-email">
                <Button>Cambiar email</Button>
              </Link>
              <Link href="/dashboard/reset-password">
                <Button>Cambiar contraseña</Button>
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between mt-4">
        <Button variant="outline" onClick={handleCancel} disabled={!isChanged}>
          Cancelar
        </Button>
        <Button onClick={handleSave} disabled={!isChanged}>
          Guardar
        </Button>
      </CardFooter>
    </div>
  );
}
